"use server";
import * as jose from "jose";
import { getFirebasePublicKeys } from "@/services/firebaseGetKey";

export const verifyToken = async (token: string) => {
  try {
    if (!token || typeof token !== "string") {
      throw new Error("유효하지 않은 토큰: 문자열이 아닙니다.");
    }

    const publicKeys = await getFirebasePublicKeys();
    const { kid } = jose.decodeProtectedHeader(token);

    if (!kid || !publicKeys[kid]) {
      throw new Error("유효한 키를 찾을 수 없습니다.");
    }

    // 직접 인증서를 사용
    const publicKey = publicKeys[kid];
    const { payload } = await jose.jwtVerify(
      token,
      await jose.importX509(publicKey, "RS256"),
    );

    const { exp } = payload;
    const currentTime = Math.floor(Date.now() / 1000);
    if (exp && exp < currentTime) {
      throw new Error("토큰이 만료되었습니다.");
    }

    return payload;
  } catch (error) {
    console.error("토큰 확인 실패:", error);
    return null;
  }
};
