"use server";
import "server-only";
import { cookies } from "next/headers";

export const createSession = async (token: string) => {
  const expiresAt = new Date(Date.now() + 10000); // 10 seconds

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};
