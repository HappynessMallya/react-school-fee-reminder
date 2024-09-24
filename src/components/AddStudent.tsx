import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface AddStudentProps {
  onStudentAdded: (student: Student) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ onStudentAdded }) => {
  const [studentData, setStudentData] = useState<Student>({
    firstName: "",
    lastName: "",
    age: undefined,
    phone: "",
    classId: undefined,
    routeId: undefined,
    teacher: "",
    address: "",
    year: undefined,
    source: "",
    useTransport: false,
  });

  const [classes, setClasses] = useState<Class[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetchClasses();
    fetchRoutes();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/classes");
      const data = await res.json();
      setClasses(data.data);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const res = await fetch("/api/routes");
      const data = await res.json();
      setRoutes(data.data);
    } catch (error) {
      console.error("Failed to fetch routes", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setStudentData({
      ...studentData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();

      if (data.success) {
        setStudentData({
          firstName: "",
          lastName: "",
          age: undefined,
          phone: "",
          classId: undefined,
          routeId: undefined,
          teacher: "",
          address: "",
          year: undefined,
          source: "",
          useTransport: false,
        });
        onStudentAdded(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Failed to add student", error);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Add Student
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            name="firstName"
            placeholder="First Name"
            value={studentData.firstName}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={handleInputChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={studentData.lastName}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={handleInputChange}
            required
          />
          <input
            name="age"
            placeholder="Age"
            type="number"
            value={studentData.age}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={handleInputChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={studentData.phone}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={handleInputChange}
            required
          />
          <select
            name="classId"
            value={studentData.classId}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.class_name}
              </option>
            ))}
          </select>
          {studentData.useTransport && (
            <select
              name="routeId"
              value={studentData.routeId}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.route_name}
                </option>
              ))}
            </select>
          )}
          <input
            name="teacher"
            placeholder="Class Teacher"
            value={studentData.teacher}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={handleInputChange}
          />
          <input
            name="address"
            placeholder="Address"
            value={studentData.address}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={handleInputChange}
          />
          <input
            name="year"
            placeholder="Year"
            type="number"
            value={studentData.year}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={handleInputChange}
          />
          <input
            name="source"
            placeholder="Where did you hear from us?"
            value={studentData.source}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={handleInputChange}
          />
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="useTransport"
            checked={studentData.useTransport}
            onChange={handleCheckboxChange}
            className="h-4 w-4 border-gray-300 rounded"
          />
          <span className="text-gray-700">Using Transport?</span>
        </label>
        <button className="w-full p-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition duration-200">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
