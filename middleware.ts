// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/verifyToken";

// 공개 경로만 정의
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const session = (await cookies()).get("session")?.value;
  const verifiedToken = session ? await verifyToken(session) : null;
  const isAuthenticated = !!verifiedToken;

  // public 경로가 아닌 모든 경로에 대해 인증 확인
  if (!isPublicRoute && !isAuthenticated) {
    const response = NextResponse.redirect(new URL("/login", req.nextUrl));
    response.cookies.delete("session");
    return response;
  }

  // 인증된 사용자의 공개 경로 접근 처리
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
