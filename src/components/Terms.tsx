import { useState, useEffect } from "react";

// Define the TermType interface for TypeScript support
interface TermType {
  id: number;
  term_name: string;
  year: number;
}

function Terms() {
  const [terms, setTerms] = useState<TermType[]>([]);
  const [termName, setTermName] = useState("");
  const [year, setYear] = useState("");
  const [showForm, setShowForm] = useState(true); // Control form visibility

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    const res = await fetch("/api/terms");
    const data = await res.json();
    if (data.success) {
      setTerms(data.data);
    }
  };

  const addTerm = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/terms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term_name: termName, year: parseInt(year) }),
    });
    const data = await res.json();
    if (data.success) {
      fetchTerms(); // Re-fetch terms after adding a new one
      setTermName("");
      setYear("");
      setShowForm(false); // Hide form after adding a term
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-center">Manage Terms</h2>

      {/* Terms Table */}
      <div className="overflow-x-auto mb-6">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Term Name</th>
              <th className="px-4 py-2 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {terms.length > 0 ? (
              terms.map((term) => (
                <tr key={term.id} className="border-b">
                  <td className="px-4 py-2">{term.term_name}</td>
                  <td className="px-4 py-2">{term.year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No terms available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Term Form - Visible if showForm is true */}
      {showForm ? (
        <form
          onSubmit={addTerm}
          className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2 mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Term Name</label>
            <input
              type="text"
              value={termName}
              onChange={(e) => setTermName(e.target.value)}
              placeholder="Term Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Add Term
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowForm(true)} // Show form when clicked
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Add Another Term
          </button>
        </div>
      )}
    </div>
  );
}

export default Terms;
