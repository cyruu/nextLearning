import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/UserModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;
    //check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return NextResponse.json({ myMsg: "User already exists" });
    }
    // generate hashed password using bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });
    const savedUser = await newUser.save();
    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({ myMsg: "User created", savedUser: savedUser });
  } catch (error: any) {
    return NextResponse.json({ mymsg: error.msg });
  }
}
