import mongoose from "mongoose";

const botFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  repo: String,
  files: [String],
  installationId: String,
});

export default mongoose.models.BotFile || mongoose.model("BotFile", botFileSchema);
