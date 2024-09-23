// pages/admin/dashboard.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (status === "unauthenticated" || session?.user.role !== "ADMIN") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <div>Welcome to the Admin Dashboard</div>;
};

export default AdminDashboard;
