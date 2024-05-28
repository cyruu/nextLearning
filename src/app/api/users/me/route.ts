import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";

import { User } from "@/models/UserModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ msg: "user found", userData: user });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg });
  }
}
