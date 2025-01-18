import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{cookie}</p>
    </div>
  );
};

export default DashboardPage;
