import { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    joinDate: '',
    birthDate: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("department", form.department);
    data.append("joinDate", form.joinDate);
    data.append("birthDate", form.birthDate);
    data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/employee/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Employee uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
