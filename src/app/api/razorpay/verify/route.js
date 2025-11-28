import crypto from "crypto";
import { connectDB } from "../../../../../lib/mongodb";
import Order from "../../../models/Order";
import User from "../../../models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const user = session.user;
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return new Response(JSON.stringify({ success: false, message: "Invalid signature" }), { status: 400 });
    }

    // Find order
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id }).populate("user");
    if (!order) {
      return new Response(JSON.stringify({ message: "Order not found" }), { status: 404 });
    }

    // Optional: only allow owner to verify
    if (order.user._id.toString() !== user.id) {
      return new Response(JSON.stringify({ message: "Not allowed" }), { status: 403 });
    }

    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.status = "paid";
    await order.save();

    // Upgrade user plan (assumes user model has `upgradePlan` method)
    await order.user.upgradePlan(order.plan);

    return new Response(JSON.stringify({ success: true, message: "Payment verified & subscription upgraded" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error verifying payment" }), { status: 500 });
  }
}
