import { useState, useEffect } from "react";

// Define the ClassType interface
interface ClassType {
  id: number;
  class_name: string;
  year: number;
}

function Classes() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [className, setClassName] = useState("");
  const [year, setYear] = useState("");
  const [currentClassId, setCurrentClassId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false); // Form is hidden by default

  // Fetch classes when the component loads
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await fetch("/api/classes");
    const data = await res.json();
    if (data.success) {
      setClasses(data.data); // Ensure this matches the ClassType structure
    } else {
      console.error("Failed to fetch classes:", data.message);
    }
  };

  const addClass = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ class_name: className, year: parseInt(year) }),
    });
    const data = await res.json();
    if (data.success) {
      fetchClasses();
      setClassName("");
      setYear("");
      setShowForm(false); // Hide form after adding class
    } else {
      console.error("Failed to add class:", data.message);
    }
  };

  const updateClass = async (id: number) => {
    const res = await fetch("/api/classes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, class_name: className, year: parseInt(year) }),
    });
    const data = await res.json();
    if (data.success) {
      fetchClasses();
      setClassName("");
      setYear("");
      setCurrentClassId(null);
      setShowForm(false); // Hide form after updating class
    } else {
      console.error("Failed to update class:", data.message);
    }
  };

  const deleteClass = async (id: number) => {
    const res = await fetch("/api/classes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      fetchClasses();
    } else {
      console.error("Failed to delete class:", data.message);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-auto text-gray-700 ">
        School Classes Management
      </h2>

      <div className="flex justify-end mb-4">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add New Class
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={(e) => {
            currentClassId ? updateClass(currentClassId) : addClass(e);
          }}
          className="space-y-4 mb-6"
        >
          <div>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Class Name"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {currentClassId ? "Update Class" : "Add Class"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold border-b">
                Class Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold border-b">
                Year
              </th>
              <th className="px-4 py-2 text-gray-600 font-semibold border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} className="hover:bg-gray-100 transition">
                <td className="px-4 py-2 border-b">{cls.class_name}</td>
                <td className="px-4 py-2 border-b">{cls.year}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => {
                      setClassName(cls.class_name);
                      setYear(cls.year.toString());
                      setCurrentClassId(cls.id);
                      setShowForm(true); // Show form for updating
                    }}
                    className="text-white hover:text-blue-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteClass(cls.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Classes;
