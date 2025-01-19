import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/verifyIdToken";

// 1. 보호된 경로와 공개 경로 지정
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/", "/logout"];

export default async function middleware(req: NextRequest) {
  // 2. 현재 경로가 보호되어 있는지 공개되어 있는지 확인
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. 세션 쿠키 가져오기
  const session = (await cookies()).get("session")?.value as string;

  console.log("session", session);

  const verifiedToken = await verifyToken(session);

  // 4. 사용자가 인증되지 않은 경우 /login으로 리디렉션
  if (isProtectedRoute && !session && !verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. 사용자가 인증되면 /dashboard로 리디렉션
  if (
    isPublicRoute &&
    session &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
