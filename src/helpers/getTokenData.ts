import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
  try {
    const retrivedToken = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(retrivedToken, process.env.TOKEN_SECRET);
    return decodedToken.id;
  } catch (err: any) {
    return NextResponse.json({ msg: err.msg });
  }
};
