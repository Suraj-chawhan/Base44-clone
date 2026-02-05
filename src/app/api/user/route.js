import connectDB from "../../../../lib/mongodb";
import User from "../../model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 }
      );
    }

    await connectDB();

    const dbUser = await User.findOne({ email: session.user.email }).lean();

    if (!dbUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          plan: dbUser.plan || "free",
          credits: dbUser.credits ?? 0,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("API /user error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
