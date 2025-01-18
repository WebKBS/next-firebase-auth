"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/actions/signup";

const SignUpForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  console.log(state);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          회원가입
        </h2>
        <form className="space-y-4" action={action}>
          {/* 이름 입력 */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="이름을 입력하세요"
              autoComplete={"name"}
            />
            {state?.errors?.name && (
              <div className="text-red-500 text-sm mt-2">
                {state.errors.name.map((item) => (
                  <div key={item}>- {item}</div>
                ))}
              </div>
            )}
          </div>
          {/* 이메일 입력 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="이메일을 입력하세요"
              autoComplete={"email"}
            />
            {state?.errors?.email && (
              <div className="text-red-500 text-sm mt-2">
                {state.errors.email.map((item) => (
                  <div key={item}>- {item}</div>
                ))}
              </div>
            )}
          </div>
          {/* 비밀번호 입력 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="비밀번호를 입력하세요"
              autoComplete={"new-password"}
            />
            {state?.errors?.password && (
              <div>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error} className="text-red-500 text-sm mt-2">
                      - {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* 회원가입 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={pending}
            >
              회원가입
            </button>
          </div>
        </form>
        {/* 로그인 링크 */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
