import SignOutButton from "@/components/buttons/SignOutButton";
import { cookies } from "next/headers";
import { verifyIdToken } from "@/lib/verifyIdToken";
import LoginForm from "@/components/forms/LoginForm";

const DashboardPage = async () => {
  const session = (await cookies()).get("session")?.value as string;

  // 토큰 검증
  try {
    const verifyToken = await verifyIdToken(session);

    if (!verifyToken) {
      // 토큰이 유효하지 않을 경우 로그인 Ui를 보여준다.
      return <LoginForm />;
    }
  } catch (error) {
    console.error(error);

    return;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
