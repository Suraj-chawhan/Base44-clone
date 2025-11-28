import connectDB from "../../../../../lib/mongodb";
import BotFile from "../../../model/BotFileSchema";
import User from "../../../model/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { App } from "octokit";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const user = await User.findOne({ email: session.user.email });
    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });

    const botRecord = await BotFile.findOne({ userId: user._id });
    if (!botRecord?.installationId) {
      return new Response(
        JSON.stringify({ error: "No GitHub installation linked to this user" }),
        { status: 400 }
      );
    }

    const octokitApp = new App({
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });


    const octokit = await octokitApp.getInstallationOctokit(
      Number(botRecord.installationId)
    );

    const { data } = await octokit.request("GET /installation/repositories");
    const repos = data.repositories.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      html_url: repo.html_url,
    }));

    const message =
      repos.length === 0
        ? "No repositories available for this installation"
        : repos.length === 1
        ? "1 repository linked"
        : `${repos.length} repositories available`;

    return new Response(JSON.stringify({ message, repos }), { status: 200 });
  } catch (err) {
    console.error("❌ /repos error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
