import { useState, useEffect } from "react";

function MoveStudents() {
  const [students, setStudents] = useState([]);
  const [newClassId, setNewClassId] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data.data);
  };

  const fetchClasses = async () => {
    const res = await fetch("/api/classes");
    const data = await res.json();
    setClasses(data.data);
  };

  const handleStudentSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStudents([...selectedStudents, value]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/move-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentIds: selectedStudents, newClassId }),
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-semibold text-center">Move Students</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {students.map((student) => (
            <div key={student.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={student.id}
                onChange={handleStudentSelection}
              />
              <label>
                {student.firstName} {student.lastName}
              </label>
            </div>
          ))}
        </div>

        <select
          name="newClassId"
          className="w-full p-2 border rounded"
          onChange={(e) => setNewClassId(e.target.value)}
          value={newClassId}
        >
          <option value="">Select New Class</option>
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.className}
            </option>
          ))}
        </select>

        <button className="w-full p-2 bg-blue-500 text-white rounded">
          Move Students
        </button>
      </form>
    </div>
  );
}

export default MoveStudents;
