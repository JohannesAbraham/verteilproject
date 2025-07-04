import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    joinDate: '',
    birthDate: '',
    displayBirthday: 'yes',
    isAdmin: 'no',
  });

  const [image, setImage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [editing,setEditing] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    axios
    .get('http://localhost:5000/api/employee/all')
    .then((res) => setEmployees(res.data))
    .catch((error) => {console.log("Error fetching all employees.")})
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("department", form.department);
    data.append("joinDate", form.joinDate);
    data.append("birthDate", form.birthDate);
    data.append("image", image);
    data.append("displayBirthday", form.displayBirthday);
    data.append("isAdmin", form.isAdmin);


    try {
      if(editing){
        await axios({
          method: 'put',
          url: `http://localhost:5000/api/employee/${editing}`,
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        alert("Employee updated")
      }
      else{
        await axios.post("http://localhost:5000/api/employee/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Employee uploaded!");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  const handleEdit = (emp) =>{
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
    };
    setForm({
      name:emp.name,
      email:emp.email,
      department:emp.department,
      joinDate: formatDate(emp.joinDate),
      birthDate: formatDate(emp.birthDate),
      displayBirthday:emp.displayBirthday,
      image:emp.image

    })
    setEditing(emp._id);
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`);
      alert("Employee deleted");

      // Refresh employee list
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Employee</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 items-center">

          <input
            name="name"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-md"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            className="w-full px-4 py-2 border rounded-md"
            value={form.department}
            onChange={handleChange}
          />

          <label className="w-full">
            Join Date:
            <input
              type="date"
              name="joinDate"
              className="w-full px-4 py-2 border rounded-md mt-1"
              value={form.joinDate}
              onChange={handleChange}
            />
          </label>

          <label className="w-full">
            Birth Date:
            <input
              type="date"
              name="birthDate"
              className="w-full px-4 py-2 border rounded-md mt-1"
              value={form.birthDate}
              onChange={handleChange}
            />
          </label>

          <label className="w-full">
            Display Birthday:
            <select
              name="displayBirthday"
              className="w-full px-4 py-2 border rounded-md mt-1"
              value={form.displayBirthday}
              onChange={handleChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="w-full">
            Is Admin:
            <select
              name="isAdmin"
              className="w-full px-4 py-2 border rounded-md mt-1"
              value={form.isAdmin}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>


          <div className="w-full text-center">
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-block bg-lgreen text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
            >
              Choose Image
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            {image && <p className="mt-2 text-sm text-gray-600">{image.name}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {editing?"Update Employee":"Add Employee"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-6xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:5000${emp.image}`}
              alt={emp.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "/fallback.jpg"; // Optional: Fallback image
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{emp.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{emp.email}</p>
              <p className="text-gray-600 text-sm mb-1">Department: {emp.department}</p>
              <p className="text-gray-500 text-xs mb-2">
                Joined: {new Date(emp.joinDate).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleEdit(emp)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(emp._id)}
                className="mt-2 px-4 py-1 pl-3 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeForm;
