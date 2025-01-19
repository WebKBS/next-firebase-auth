import SignOutButton from "@/components/buttons/SignOutButton";
import Link from "next/link";

const DashboardPage = async () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href={"/dashboard/setting"}>Setting Page</Link>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
