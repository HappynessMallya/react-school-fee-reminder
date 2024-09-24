import { FC } from "react";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaRoute,
  FaMoneyBillWave,
} from "react-icons/fa"; // Icons

interface SidebarProps {
  setActiveComponent: (component: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ setActiveComponent }) => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-6 shadow-lg flex flex-col justify-between">
      {/* Sidebar Heading */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">SuperAdmin</h2>

        {/* Sidebar Links */}
        <ul className="space-y-4">
          <li
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300"
            onClick={() => setActiveComponent("classes")}
          >
            <FaChalkboardTeacher className="text-xl" />
            <span>Manage Classes</span>
          </li>
          <li
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300"
            onClick={() => setActiveComponent("terms")}
          >
            <FaCalendarAlt className="text-xl" />
            <span>Manage Terms</span>
          </li>
          <li
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300"
            onClick={() => setActiveComponent("routes")}
          >
            <FaRoute className="text-xl" />
            <span>Manage Routes</span>
          </li>
          <li
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300"
            onClick={() => setActiveComponent("fees")}
          >
            <FaMoneyBillWave className="text-xl" />
            <span>Manage Fees</span>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-400">
        <p>&copy; 2024 YourSchool</p>
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
