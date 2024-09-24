import { useState, useEffect } from "react";

function Routes() {
  const [routes, setRoutes] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [year, setYear] = useState("");
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const res = await fetch("/api/routes");
    const data = await res.json();
    if (data.success) {
      setRoutes(data.data);
    }
  };

  const addRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ route_name: routeName, year: parseInt(year) }),
    });
    const data = await res.json();
    if (data.success) {
      fetchRoutes(); // Re-fetch routes after adding a new one
      setRouteName("");
      setYear("");
      setShowForm(false); // Hide form after adding a route
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Routes</h2>

      {/* Button to show form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        {showForm ? "Cancel" : "Add New Route"}
      </button>

      {/* Conditional rendering of the form */}
      {showForm && (
        <form onSubmit={addRoute} className="mb-4">
          <input
            type="text"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            placeholder="Route Name"
            required
            className="border border-gray-300 rounded p-2 mr-2"
          />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            required
            className="border border-gray-300 rounded p-2 mr-2"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
          >
            Add Route
          </button>
        </form>
      )}

      {/* Routes Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-2 px-4 border-b">Route Name</th>
            <th className="py-2 px-4 border-b">Year</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr
              key={route.id}
              className="hover:bg-gray-100 transition duration-300"
            >
              <td className="py-2 px-4 border-b">{route.route_name}</td>
              <td className="py-2 px-4 border-b">{route.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Routes;
