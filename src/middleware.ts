import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // gives current path "/login", "/singup"
  const path = request.nextUrl.pathname;
  const isPublicPath = path == "/login" || path == "/signup";
  const token = request.cookies.get("token") || "";
  // token => logged in cha
  // isPublicPath => /login /signup page ma jadai cha
  // jana mildaina
  if (token && isPublicPath) {
    // get url till domain part and not the end points
    const baseUrl = request.nextUrl.origin;
    return NextResponse.redirect(`${baseUrl}/profile`);
    // alternative
    // return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // logged in chaina tara priavte path ma jana khojiracha
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile/*", "/login", "/signup"],
};
