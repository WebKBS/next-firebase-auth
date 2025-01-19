"use server";
import * as jose from "jose";
import { getFirebasePublicKeys } from "@/services/firebaseGetKey";

export const verifyToken = async (token: string) => {
  try {
    // 토큰이 없는 경우
    if (!token) {
      return null;
    }

    const publicKeys = await getFirebasePublicKeys();
    const decodedHeader = jose.decodeProtectedHeader(token);
    // const decodedToken = jose.decodeJwt(token);

    // kid가 없는 경우
    if (!decodedHeader.kid || !publicKeys[decodedHeader.kid]) {
      console.error("Invalid key ID");
      return null;
    }

    try {
      const publicKey = await jose.importX509(
        publicKeys[decodedHeader.kid],
        "RS256",
      );
      const { payload } = await jose.jwtVerify(token, publicKey);

      // 토큰 만료 확인
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        console.error("Token has expired");
        return null;
      }

      return payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  } catch (error) {
    console.error("Token processing failed:", error);
    return null;
  }
};
