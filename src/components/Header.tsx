"use client";
import { FC } from "react";
import { FaUserCircle } from "react-icons/fa"; // For user icon
import { FiLogOut } from "react-icons/fi"; // For logout icon
import { signOut } from "next-auth/react"; // Import the signOut function

const Header: FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* School Name */}
      <h1 className="text-2xl font-bold text-gray-700 text-center">
        Wecare Kids School
      </h1>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* User Icon */}
        <FaUserCircle className="text-3xl text-gray-500 cursor-pointer hover:text-gray-700" />

        {/* Logout Button */}
        <button
          className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
          onClick={() => signOut()} // Call the signOut function
        >
          <FiLogOut className="text-xl mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
