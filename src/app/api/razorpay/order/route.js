import Razorpay from "razorpay";
import { connectDB } from "../../../../../lib/mongodb"; // your DB connection
import Order from "../../../model/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"; // NextAuth config
import dotenv from "dotenv";

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Plan prices (in paise)
const PLAN_PRICES = {
  pre: 2500 * 100,
  mid: 5000 * 100,
  pro: 7000 * 100,
};

export async function POST(req) {
  try {
    await connectDB(); // connect to MongoDB

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const user = session.user; // This is your NextAuth user object
    const body = await req.json();
    const { plan } = body;

    if (!PLAN_PRICES[plan]) {
      return new Response(JSON.stringify({ message: "Invalid plan selected" }), { status: 400 });
    }

    // Optionally, fetch full user document if you need extra fields like `plan` and `planExpiry`
    const userDoc = await User.findById(user.id);
    if (!userDoc) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    if (userDoc.plan !== "free" && userDoc.planExpiry && userDoc.planExpiry > new Date()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `You already have an active ${userDoc.plan} subscription until ${userDoc.planExpiry.toDateString()}`,
        }),
        { status: 400 }
      );
    }

    const options = {
      amount: PLAN_PRICES[plan],
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save order in DB
    const newOrder = await Order.create({
      user: user.id,
      razorpayOrderId: order.id,
      amount: options.amount,
      currency: options.currency,
      plan,
      status: "created",
    });

    return new Response(JSON.stringify({ order, newOrder }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error creating order" }), { status: 500 });
  }
}
