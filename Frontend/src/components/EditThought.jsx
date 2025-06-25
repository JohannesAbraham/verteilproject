import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditThought = () => {
  const [formData, setFormData] = useState({
    thought: "",
    author: "",
    word: "",
    meaning: ""
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const password = query.get("pwd");

  useEffect(() => {
    axios.get("http://localhost:5000/api/thoughtword")
      .then(res => {
        if (res.data) {
          setFormData({
            thought: res.data.thought || "",
            author: res.data.author || "",
            word: res.data.word || "",
            meaning: res.data.meaning || ""
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/thoughtword/update", {
        ...formData,
        password
      });
      alert("Updated successfully");
      navigate("/");
    } catch (err) {
      alert("Error updating: " + err.response?.data?.error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Thought & Word of the Day</h2>
      <input name="thought" placeholder="Thought" value={formData.thought} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="word" placeholder="Word" value={formData.word} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="meaning" placeholder="Meaning" value={formData.meaning} onChange={handleChange} className="border p-2 w-full mb-2" />
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
};

export default EditThought;
