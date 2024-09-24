import { useState, useEffect } from "react";

function AddPayment() {
  const [paymentData, setPaymentData] = useState({
    student_id: "", // Matches API expectations
    class_id: "", // Added class_id for the API
    term_id: "", // Matches API expectations
    amount: "",
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    fetchStudents();
    fetchTerms();
    fetchClasses(); // Fetch classes
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data.data);
  };

  const fetchTerms = async () => {
    const res = await fetch("/api/terms");
    const data = await res.json();
    setTerms(data.data);
  };

  const fetchClasses = async () => {
    const res = await fetch("/api/classes");
    const data = await res.json();
    setClasses(data.data);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    const result = await res.json();
    if (result.success) {
      alert("Payment added successfully!");
      // Optionally reset the form or handle success
      setPaymentData({ student_id: "", class_id: "", term_id: "", amount: "" });
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-semibold text-center">Add Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropdown for Students */}
        <select
          name="student_id"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          value={paymentData.student_id}
          required
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>

        {/* Dropdown for Classes */}
        <select
          name="class_id"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          value={paymentData.class_id}
          required
        >
          <option value="">Select Class</option>
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.class_name}
            </option>
          ))}
        </select>

        {/* Dropdown for Terms */}
        <select
          name="term_id"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          value={paymentData.term_id}
          required
        >
          <option value="">Select Term</option>
          {terms.map((term) => (
            <option key={term.id} value={term.id}>
              {term.term_name}
            </option>
          ))}
        </select>

        <input
          name="amount"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          type="number"
          value={paymentData.amount}
          required
        />

        <button className="w-full p-2 bg-blue-500 text-white rounded">
          Add Payment
        </button>
      </form>
    </div>
  );
}

export default AddPayment;
