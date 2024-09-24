"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Classes from "@/components/Classes";
import Terms from "@/components/Terms";
import Routes from "@/components/Routes";
import Fees from "@/components/Fees";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SuperAdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || session?.user.role !== "SUPERADMIN") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  const [activeComponent, setActiveComponent] = useState("classes");

  const renderComponent = () => {
    switch (activeComponent) {
      case "classes":
        return <Classes />;
      case "terms":
        return <Terms />;
      case "routes":
        return <Routes />;
      case "fees":
        return <Fees />;
      default:
        return <Classes />;
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-100">
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className="flex-1 p-8 overflow-auto">{renderComponent()}</div>
      </div>
      <Footer />
    </>
  );
};

export default SuperAdminDashboard;
