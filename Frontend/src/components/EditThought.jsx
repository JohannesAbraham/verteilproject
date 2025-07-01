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
    <div className="w-1/2 mx-auto p-6 flex flex-col space-y-4">
  <h2 className="text-2xl font-bold mb-4">Edit Thought & Word of the Day</h2>

  <div className="flex flex-col">
    <label className="font-semibold mb-1">Thought</label>
    <textarea
      name="thought"
      value={formData.thought}
      onChange={handleChange}
      className="border p-2 resize-none overflow-hidden rounded"
      rows={1}
      onInput={e => autoResize(e)}
    />
  </div>

  <div className="flex flex-col">
    <label className="font-semibold mb-1">Author</label>
    <input
      type="text"
      name="author"
      value={formData.author}
      onChange={handleChange}
      className="border p-2 rounded"
    />
  </div>

  <div className="flex flex-col">
    <label className="font-semibold mb-1">Word</label>
    <input
      type="text"
      name="word"
      value={formData.word}
      onChange={handleChange}
      className="border p-2 rounded"
    />
  </div>

  <div className="flex flex-col">
    <label className="font-semibold mb-1">Meaning</label>
    <textarea
      name="meaning"
      value={formData.meaning}
      onChange={handleChange}
      className="border p-2 resize-none overflow-hidden rounded"
      rows={1}
      onInput={e => autoResize(e)}
    />
  </div>

  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
    Save
  </button>
</div>

  );
};

export default EditThought;
