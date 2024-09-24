// pages/auth/login.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (session?.user) {
      if (session.user.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else if (session.user.role === "SUPERADMIN") {
        router.push("/superadmin-dashboard");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side with Logo and App Name */}
      <div className="bg-[url('/images/bg.jpg')] bg-cover shadow-2xl shadow-white text-white flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-16">
        <div className="text-center">
          <img
            src="/images/logo.png" // Replace with your logo path
            alt="App Logo"
            className="w-32 h-32 mb-4 mx-auto"
          />
          <h1 className="text-4xl font-bold">School Fee Reminder App</h1>
          <p className="mt-4 text-lg">
            Streamlining payment reminders for students and schools.
          </p>
        </div>
      </div>

      {/* Right side with Login Form */}
      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </form>
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
