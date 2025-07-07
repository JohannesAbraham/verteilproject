import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

// Placeholder job descriptions
const JOB_DESCRIPTIONS = {
  "Software Engineer": "Design, develop, and maintain software applications. Collaborate with team members to deliver high-quality products.",
  "Product Manager": "Define product vision and strategy. Work with cross-functional teams to bring products to market.",
  "UX Designer": "Create user-centered designs. Conduct research and testing to improve user experience."
};

function JobDescription({ job }) {
  const location = useLocation();
  const isEditing = new URLSearchParams(location.search).get("editing") === "true";
  const { name } = useParams();
  const [jobDesc, setJobDesc] = React.useState("");
  const [jobName, setJobName] = React.useState(name);

  useEffect(() => {
    // Use placeholder data instead of API call
    setJobDesc(JOB_DESCRIPTIONS[name] || "No job description available.");
  }, [name]);

  const handleSave = async() => {
    // Simulate save operation
    console.log("Would save:", { description: jobDesc, name: jobName });
    alert("Saved successfully (placeholder)");
  }

  return(
    <div className="flex flex-col items-start min-h-screen">
      <div className="px-10 pt-5 pb-5">
        <h1 className="text-5xl font-ariel font-semibold text-dgreen ">{name}</h1>
      </div>
      <div className="w-full px-10 pt-5">
        <div className="bg-light h-full text-dgreen border-lgreen border-2 shadow-xl rounded-xl p-6 w-full">
        {isEditing ? (
          <div className="flex flex-col h-[calc(80vh-90px)]">
            <textarea
              value={jobDesc ?? "Add job description here..."}
              onChange={(e) => setJobDesc(e.target.value)}
              className="w-full h-full p-4 text-xl rounded-md border border-lgreen resize-none"
            />
            <div className='flex justify-center'>
              <button
                onClick={handleSave}
                className="mt-4 px-6 py-2 bg-lgreen text-white font-ariel font-bold rounded-md hover:bg-dgreen shadow-xl"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-row space-x-3 pb-5">
              <FaBriefcase className="text-3xl text-dgreen"/>
              <h1 className='text-3xl font-semibold font-ariel'>Job Description</h1>
            </div>
            <p className="text-xl font-ariel">{jobDesc || "No job description available."}</p>
          </>
        )}
        </div>
      </div>
    </div>
  )
}

export default JobDescription;