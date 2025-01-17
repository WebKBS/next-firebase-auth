import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }).trim(),
  email: z.string().email({ message: "유효한 이메일을 입력하세요." }).trim(),
  password: z
    .string()
    .min(8, { message: "8자 이상이어야 합니다." })
    .regex(/[a-zA-Z]/, { message: "문자를 하나 이상 포함해야 합니다." })
    .regex(/[0-9]/, { message: "숫자를 하나 이상 포함하세요." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "특수 문자를 하나 이상 포함해야 합니다.",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
