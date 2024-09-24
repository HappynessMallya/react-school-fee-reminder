// pages/admin/dashboard.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaUserPlus,
  FaMoneyCheckAlt,
  FaBell,
  FaArrowsAltV,
} from "react-icons/fa";
import AddStudent from "@/components/AddStudent";
import AddPayment from "@/components/AddPayment";
import SendReminder from "@/components/SendReminder";
import MoveStudents from "@/components/MoveStudents";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define Student interface
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  classId: number;
  routeId: number | null;
  teacher: string;
  address: string;
  year: number;
  source: string;
  useTransport: boolean;
}

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [activeComponent, setActiveComponent] = useState<string>("addStudent");

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || session?.user.role !== "ADMIN") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch("/api/students");
      const data = await res.json();
      if (data.success) {
        setStudents(data.data);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentAdded = (newStudent: Student) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "addStudent":
        return <AddStudent onStudentAdded={handleStudentAdded} />;
      case "addPayment":
        return <AddPayment />;
      case "sendReminder":
        return <SendReminder />;
      case "moveStudents":
        return <MoveStudents />;
      default:
        return <AddStudent onStudentAdded={handleStudentAdded} />;
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-4">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <nav className="flex-1 px-2 space-y-2">
            <button
              className={`w-full text-left px-4 py-2 flex items-center ${
                activeComponent === "addStudent" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveComponent("addStudent")}
            >
              <FaUserPlus className="mr-2" /> Add Student
            </button>
            <button
              className={`w-full text-left px-4 py-2 flex items-center ${
                activeComponent === "addPayment" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveComponent("addPayment")}
            >
              <FaMoneyCheckAlt className="mr-2" /> Add Payment
            </button>
            <button
              className={`w-full text-left px-4 py-2 flex items-center ${
                activeComponent === "sendReminder" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveComponent("sendReminder")}
            >
              <FaBell className="mr-2" /> Send Reminder
            </button>
            <button
              className={`w-full text-left px-4 py-2 flex items-center ${
                activeComponent === "moveStudents" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveComponent("moveStudents")}
            >
              <FaArrowsAltV className="mr-2" /> Move Students
            </button>
          </nav>
        </aside>

        <main className="flex-1 bg-gray-100 p-6">{renderComponent()}</main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
