"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default DashboardPage;
