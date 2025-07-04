import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditHolidays() {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ name: "", date: "" });
  const navigate = useNavigate();

  const fetchHolidays = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/holidays");
      console.log("Fetched holidays:", res.data);

      // Ensure it's an array
      if (Array.isArray(res.data)) {
        setHolidays(res.data);
      } else if (res.data.holidays && Array.isArray(res.data.holidays)) {
        setHolidays(res.data.holidays);
      } else {
        console.error("Invalid holidays format:", res.data);
        setHolidays([]); // Fallback
      }
    } catch (err) {
      console.error("Failed to load holidays:", err);
      setHolidays([]); // Fallback
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleUpdate = async (id, updatedHoliday) => {
    try {
      await axios.put(`http://localhost:5000/api/holidays/${id}`, updatedHoliday);
      fetchHolidays();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/holidays/${id}`);
      fetchHolidays();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAdd = async () => {
    if (!newHoliday.name || !newHoliday.date) {
      alert("Please fill in both name and date");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/holidays", newHoliday);
      setNewHoliday({ name: "", date: "" });
      fetchHolidays();
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const handleChange = (id, field, value) => {
    setHolidays((prev) =>
      prev.map((h) => (h._id === id ? { ...h, [field]: value } : h))
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="editholidays-page card w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg flex flex-col space-y-10 bg-light">
      <h2 className="text-xl text-dgreen font-semibold">Edit Holidays</h2>
      <table className="holiday-table">
        <tbody>
          {Array.isArray(holidays) &&
            holidays.map((holiday) => (
            <div className="flex flex-row items-center justify-center">
              <tr key={holiday._id}>
                <td className="px-4 py-2">
                <input
                    type="date"
                    className="border rounded px-2 py-1 w-40"
                    value={holiday.date?.substring(0, 10)}
                    onChange={(e) => handleChange(holiday._id, "date", e.target.value)}
                />
                </td>
                <td className="px-4 py-2">
                <input
                    type="text"
                    className="border rounded px-2 py-1 w-48"
                    value={holiday.name}
                    onChange={(e) => handleChange(holiday._id, "name", e.target.value)}
                />
                </td>
                <td className="px-4 py-2 space-x-2">
                <button
                    onClick={() => handleUpdate(holiday._id, {
                    name: holiday.name,
                    date: holiday.date,
                    })}
                    className="btn btn-sm btn-primary bg-lgreen text-white"
                >
                    Save
                </button>
                <button
                    onClick={() => handleDelete(holiday._id)}
                    className="btn btn-sm btn-danger bg-red-600 text-white"
                >
                    Delete
                </button>
                </td>
              </tr>
              </div>
            ))}
        </tbody>
      </table>

      <div className="flex flex-col items-center justify-center space-y-3">
        <h3 className="mt-6 pb-2 text-dgreen text-lg font-semibold ">Add New Holiday</h3>
        <div className="add-holiday-form">
            <input
            type="date"
            value={newHoliday.date}
            onChange={(e) =>
                setNewHoliday({ ...newHoliday, date: e.target.value })
            }
            />
            <input
            type="text"
            placeholder="Holiday Name"
            value={newHoliday.name}
            onChange={(e) =>
                setNewHoliday({ ...newHoliday, name: e.target.value })
            }
            />
            <button onClick={handleAdd} className="btn btn-success bg-lgreen text-white">
            Add
            </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default EditHolidays;
