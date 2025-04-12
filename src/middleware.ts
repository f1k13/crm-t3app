import { NextResponse, type NextRequest } from "next/server";

function isAuth(req: NextRequest) {
  const token = req.cookies.get("token");
  return !!token;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    const url = req.nextUrl.clone();

    url.pathname = isAuth(req) ? "/main" : "/auth/sign-in";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
