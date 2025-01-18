"use server";
import "server-only";
import { FormState, SignupFormSchema } from "@/schema/signup.schema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { redirect } from "next/navigation";

export const signup = async (prevState: FormState, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = SignupFormSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        email: ["이미 사용 중인 이메일입니다."],
      },
    };
  }

  redirect("/dashboard");
};
