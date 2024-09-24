import { useState, useEffect } from "react";

function SendReminder() {
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await fetch("/api/classes");
    const data = await res.json();
    setClasses(data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/remind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ class_id: classId }),
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-semibold text-center">Send Reminder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropdown for Class */}
        <select
          name="classId"
          className="w-full p-2 border rounded"
          onChange={(e) => setClassId(e.target.value)}
          value={classId}
        >
          <option value="">Select Class</option>
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.className}
            </option>
          ))}
        </select>

        <button className="w-full p-2 bg-blue-500 text-white rounded">
          Send Reminder
        </button>
      </form>
    </div>
  );
}

export default SendReminder;
