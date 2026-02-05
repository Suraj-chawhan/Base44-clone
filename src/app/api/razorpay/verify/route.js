import crypto from "crypto";
import connectDB from "../../../../../lib/mongodb";
import Order from "../../../model/Order";
import User from "../../../model/User";
import { getServerSession } from "next-auth/next"; // Make sure this is correct
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    // ✅ Use the correct server-side env variable
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return new Response(JSON.stringify({ message: "Invalid signature" }), { status: 400 });
    }

    // Fetch order with user populated
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id }).populate("user");
    if (!order) {
      return new Response(JSON.stringify({ message: "Order not found" }), { status: 404 });
    }

    // Verify order belongs to session user
    if (order.user._id.toString() !== session.user.id) {
      return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
    }

    // Update order status
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.status = "paid";
    await order.save();

    // Upgrade user plan using model method
    await order.user.upgradePlan(order.plan);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Razorpay Verify Error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
