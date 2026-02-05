import Razorpay from "razorpay";
import connectDB from "../../../../../lib/mongodb";
import Order from "../../../model/Order";
import User from "../../../model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // ✅ safe
  key_secret: process.env.RAZORPAY_KEY_SECRET,    // ✅ server-only
});

const PLAN_PRICES = {
  pre: 2500 * 100,
  mid: 5000 * 100,
  pro: 7000 * 100,
};

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { plan } = await req.json();
    if (!PLAN_PRICES[plan]) {
      return new Response(JSON.stringify({ message: "Invalid plan" }), { status: 400 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    if (user.plan !== "free" && user.planExpiry > new Date()) {
      return new Response(JSON.stringify({ message: "Active subscription exists" }), { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: PLAN_PRICES[plan],
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    await Order.create({
      user: user._id,
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
      status: "created",
    });

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
