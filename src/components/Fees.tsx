import { useState, useEffect } from "react";

function Fees() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [classId, setClassId] = useState("");
  const [termId, setTermId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    fetchClasses();
    fetchTerms();
    fetchRoutes();
    fetchFees();
  }, []);

  const fetchClasses = async () => {
    const res = await fetch("/api/classes");
    const data = await res.json();
    if (data.success) {
      setClasses(data.data);
    }
  };

  const fetchTerms = async () => {
    const res = await fetch("/api/terms");
    const data = await res.json();
    if (data.success) {
      setTerms(data.data);
    }
  };

  const fetchRoutes = async () => {
    const res = await fetch("/api/routes");
    const data = await res.json();
    if (data.success) {
      setRoutes(data.data);
    }
  };

  const fetchFees = async () => {
    const res = await fetch("/api/fees");
    const data = await res.json();
    if (data.success) {
      setFees(data.data);
    }
  };

  const addFee = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        class_id: parseInt(classId),
        term_id: parseInt(termId),
        route_id: routeId ? parseInt(routeId) : null,
        fee_amount: parseFloat(feeAmount),
      }),
    });

    const data = await res.json();
    if (data.success) {
      setClassId("");
      setTermId("");
      setRouteId("");
      setFeeAmount("");
      fetchFees();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Fees</h2>

      {/* Button to toggle the form visibility */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add Fee"}
      </button>

      {/* Conditional rendering of the form */}
      {showForm && (
        <form
          onSubmit={addFee}
          className="mb-4 p-4 border rounded-lg bg-gray-100 shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class_name}
                </option>
              ))}
            </select>

            <select
              value={termId}
              onChange={(e) => setTermId(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Term</option>
              {terms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.term_name}
                </option>
              ))}
            </select>

            <select
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.route_name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            value={feeAmount}
            onChange={(e) => setFeeAmount(e.target.value)}
            placeholder="Fee Amount"
            required
            className="border p-2 rounded mt-4 w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
          >
            Add Fee
          </button>
        </form>
      )}

      <h3 className="text-xl font-semibold mb-2">List of Fees</h3>

      {/* Fees Table */}
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b">Class</th>
            <th className="py-2 px-4 border-b">Term</th>
            <th className="py-2 px-4 border-b">Route</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{fee.class.class_name}</td>
              <td className="py-2 px-4 border-b">{fee.term.term_name}</td>
              <td className="py-2 px-4 border-b">
                {fee.route ? fee.route.route_name : "N/A"}
              </td>
              <td className="py-2 px-4 border-b">{fee.fee_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fees;

// import { useState, useEffect } from "react";

// function Fees() {
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [terms, setTerms] = useState<Term[]>([]);
//   const [routes, setRoutes] = useState<Route[]>([]);
//   const [fees, setFees] = useState<Fee[]>([]);
//   const [classId, setClassId] = useState("");
//   const [termId, setTermId] = useState("");
//   const [routeId, setRouteId] = useState("");
//   const [feeAmount, setFeeAmount] = useState("");

//   useEffect(() => {
//     fetchClasses();
//     fetchTerms();
//     fetchRoutes();
//     fetchFees();
//   }, []);

//   const fetchClasses = async () => {
//     const res = await fetch("/api/classes");
//     const data = await res.json();
//     if (data.success) {
//       setClasses(data.data);
//     }
//   };

//   const fetchTerms = async () => {
//     const res = await fetch("/api/terms");
//     const data = await res.json();
//     if (data.success) {
//       setTerms(data.data);
//     }
//   };

//   const fetchRoutes = async () => {
//     const res = await fetch("/api/routes");
//     const data = await res.json();
//     if (data.success) {
//       setRoutes(data.data);
//     }
//   };

//   const fetchFees = async () => {
//     const res = await fetch("/api/fees");
//     const data = await res.json();
//     if (data.success) {
//       setFees(data.data);
//     }
//   };

//   const addFee = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch("/api/fees", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         class_id: parseInt(classId),
//         term_id: parseInt(termId),
//         route_id: routeId ? parseInt(routeId) : null,
//         fee_amount: parseFloat(feeAmount),
//       }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       setClassId("");
//       setTermId("");
//       setRouteId("");
//       setFeeAmount("");
//       fetchFees();
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">Manage Fees</h2>
//       <form onSubmit={addFee} className="bg-white shadow-md rounded-lg p-6 mb-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <select
//             value={classId}
//             onChange={(e) => setClassId(e.target.value)}
//             required
//             className="p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls.id} value={cls.id}>
//                 {cls.class_name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={termId}
//             onChange={(e) => setTermId(e.target.value)}
//             required
//             className="p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Term</option>
//             {terms.map((term) => (
//               <option key={term.id} value={term.id}>
//                 {term.term_name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={routeId}
//             onChange={(e) => setRouteId(e.target.value)}
//             required
//             className="p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Route</option>
//             {routes.map((route) => (
//               <option key={route.id} value={route.id}>
//                 {route.route_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <input
//           type="number"
//           value={feeAmount}
//           onChange={(e) => setFeeAmount(e.target.value)}
//           placeholder="Fee Amount"
//           required
//           className="mt-4 p-2 border border-gray-300 rounded-md w-full"
//         />
//         <button
//           type="submit"
//           className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
//         >
//           Add Fee
//         </button>
//       </form>

//       <h3 className="text-xl font-semibold text-gray-700 mb-2">List of Fees</h3>
//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="py-2 px-4 border-b">Class</th>
//             <th className="py-2 px-4 border-b">Term</th>
//             <th className="py-2 px-4 border-b">Route</th>
//             <th className="py-2 px-4 border-b">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {fees.map((fee) => (
//             <tr key={fee.id} className="hover:bg-gray-50">
//               <td className="py-2 px-4 border-b">{fee.class.class_name}</td>
//               <td className="py-2 px-4 border-b">{fee.term.term_name}</td>
//               <td className="py-2 px-4 border-b">{fee.route ? fee.route.route_name : "N/A"}</td>
//               <td className="py-2 px-4 border-b">{fee.fee_amount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Fees;
