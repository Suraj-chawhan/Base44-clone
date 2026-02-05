import dbConnect from "../../../../../lib/mongodb.js";
import User from "../../../model/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: `Email already registered with ${existingUser.provider}`,
        }),
        { status: 400 }
      );
    }

    // ❌ DO NOT HASH HERE
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password, // 👈 plain password
      provider: "local",
      plan: "free",
      credits: 3,
    });

    await user.save(); // 🔐 hashed by schema hook

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
