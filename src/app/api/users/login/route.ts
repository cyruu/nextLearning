import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/UserModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, password } = requestBody;
    // check if username exits
    const userExits = await User.findOne({ username });
    if (!userExits) {
      return NextResponse.json({ mymsg: "user not found" });
    }
    // check if password match
    const validPassword = await bcryptjs.compare(password, userExits.password);
    // create token data
    const tokenData = {
      id: userExits._id,
      username: userExits.username,
      email: userExits.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      mymsg: "login successful",
      success: true,
      token: token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ mymsg: err.msg });
  }
}
