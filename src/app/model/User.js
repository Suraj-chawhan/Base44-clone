// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false, minlength: 6, required: function() { return this.provider === "local"; } },
  installationId: String,
  provider: { type: String, enum: ["local", "google", "github"], default: "local" },
  plan: { type: String, enum: ["free", "pre", "mid", "pro"], default: "free" },
  planExpiry: Date,
  credits: { type: Number, default: 3 },
  isVerified: { type: Boolean, default: false },
  verificationOTP: String,
  verificationOTPExpires: Date,
  resetOTP: String,
  resetOTPExpires: Date
}, { timestamps: true });

// Hash password before save
userSchema.pre("save", async function(next) {
  if (this.provider !== "local" || !this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Use a credit
userSchema.methods.useCredit = async function() {
  if (this.plan !== "free") return { allowed: true, plan: this.plan, unlimited: true };
  if (this.credits > 0) { this.credits -= 1; await this.save(); return { allowed: true, creditsLeft: this.credits, plan: this.plan }; }
  return { allowed: false, message: "Free credits exhausted. Please upgrade.", plan: this.plan };
};

// Upgrade plan
userSchema.methods.upgradePlan = async function(plan) {
  this.plan = plan;
  this.planExpiry = new Date(Date.now() + 30*24*60*60*1000);
  this.credits = 0;
  await this.save();
  return { plan: this.plan, expiry: this.planExpiry };
};

// Check active subscription
userSchema.methods.isSubscriptionActive = function() {
  if (this.plan === "free") return this.credits > 0;
  return this.planExpiry && this.planExpiry > new Date();
};

export default mongoose.models.User || mongoose.model("User", userSchema);
