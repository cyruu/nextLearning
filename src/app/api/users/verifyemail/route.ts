import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/UserModel";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log("user", user);
    if (!user) {
      return NextResponse.json({ msg: "Invalid token" });
    }
    console.log("user", user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
    return NextResponse.json({ msg: "Email Verified Successful" });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg });
  }
}
