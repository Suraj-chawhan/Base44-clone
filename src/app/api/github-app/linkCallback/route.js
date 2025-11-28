import  connectDB  from "../../../../../lib/mongodb";
import BotFile from "../../../model/BotFile";
import User from "../../../model/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route"; // adjust if needed

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const { installationId } = await req.json();
    if (!installationId)
      return new Response(
        JSON.stringify({ error: "installationId required" }),
        { status: 400 }
      );

    const user = await User.findOne({ email: session.user.email });
    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });

    await BotFile.findOneAndUpdate(
      { userId: user._id },
      { installationId: String(installationId) },
      { upsert: true }
    );

    return new Response(
      JSON.stringify({ message: "✅ Installation linked successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
