import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    plan: {
      type: String,
      enum: ["pre", "mid", "pro"],
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in Next.js hot reload
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
