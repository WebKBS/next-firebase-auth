"use server";
import "server-only";
import { FormState } from "@/schema/signup.schema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

export const signIn = async (prevState: FormState, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(email, password);

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    const token = await response.user.getIdToken();

    await createSession(token);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        email: ["이메일 또는 비밀번호가 일치하지 않습니다."],
      },
    };
  }

  redirect("/dashboard");
};
