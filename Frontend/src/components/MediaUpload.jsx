import { useState } from "react";
import axios from "axios";

const MediaUpload = () => {
  const [form, setForm] = useState({ title: "", description: ""});
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("image", image);
    try {
        await axios.post("http://localhost:5000/api/media/uploadmedia", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Media uploaded!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div>
        <div className="flex flex-col ml-40 p-4 space-y-4">
            <h1 className="font-ariel pb-7 font-bold text-4xl text-dgreen">Upload Media</h1>
            <input className='text-xl p-2' name="title" placeholder="Title" onChange={handleChange} />
            <input type='file' className='text-xl p-2 bg-lgreen' onChange={handleImageChange} />
            <textarea className='text-xl h-[40vh] p-2' name="description" placeholder="Description" onChange={handleChange} />        
        </div>
        <div className='flex justify-center'>
            <button className="text-lg text-light bg-lgreen w-50" onClick={handleSubmit}>Upload</button>
        </div>
    </div>
  );
};

export default MediaUpload;
