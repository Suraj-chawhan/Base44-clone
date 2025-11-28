import dbConnect from "../../../../../lib/mongodb.js";
import User from "../../../model/User"; // your User schema
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return new Response(JSON.stringify({ message: `Email already registered in  ${existingUser.provider} login` }), { status: 400 });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      plan: "free",
      credits: 3,
    });

    await user.save();

    return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
