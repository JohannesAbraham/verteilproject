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
    e.preventDefault(); // Prevents default page reload

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
    <div className="max-w-xl mx-auto mt-6 bg-white p-6 shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" placeholder="Name" className="input" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" className="input" value={form.email} onChange={handleChange} />
        <input name="department" placeholder="Department" className="input" value={form.department} onChange={handleChange} />
        
        <label className="block">
          Join Date:
          <input type="date" name="joinDate" className="input" value={form.joinDate} onChange={handleChange} />
        </label>

        <label className="block">
          Birth Date:
          <input type="date" name="birthDate" className="input" value={form.birthDate} onChange={handleChange} />
        </label>

        <input type='file' className='text-xl p-2 bg-lgreen' onChange={handleImageChange} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
