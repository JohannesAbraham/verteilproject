import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const EditNode = ({ id, data, selected, setNodes, isAdmin }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "");
  //console.log("Rendering EditNode. isAdmin:", isAdmin);

  /*const [isAdmin,setIsAdmin] = useState(false);

  useEffect(() => {
    axios
    .get("http://localhost:5000/api/auth/is-admin",{withCredentials:true})
    .then(res => setIsAdmin(res.data.isAdmin))
    .catch(() => setIsAdmin(false));
  },[]);*/

  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const descriptionToggle = (e) => {
    e.stopPropagation();
    navigate(`/job/${encodeURIComponent(label)}?editing=true`);
    console.log("Description button clicked");
  }

  const clickTimeout = useRef(null);       // stores timer for single click
  const lastClickTime = useRef(0);         // time of last click

  const handleClick = (e) => {
    e.stopPropagation();
    console.log("Clicked at:", Date.now(), "isAdmin:", isAdmin);


    const now = Date.now();                         // current time
    const timeSinceLastClick = now - lastClickTime.current; // time difference
    lastClickTime.current = now;

    if (timeSinceLastClick < 500) {
      // Detected a double click!
      if (isAdmin) {
        console.log("Double Click - admin edit mode");
        setEditing(true);
      }
      clearTimeout(clickTimeout.current); // cancel any pending single click
    } else {
      // Potential single click: wait to see if another comes
      clickTimeout.current = setTimeout(() => {
        if (!isAdmin) {
          console.log("Single Click - user");
          navigate(`/job/${encodeURIComponent(label)}?editing=false`);
        }
      }, 260); // Slightly more than double-click detection window
    }
  };


  const saveLabel = () => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label } }
          : node
      )
    );
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveLabel();
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`rounded-lg border-2 p-2 bg-light shadow-md shadow-lgreen w-50 text-center font-ariel relative font-bold ${
          selected ? "border-yellow-500 border-4" : "border-lgreen"
        }`}

      >
        {/* Multiple Connection Points */}
        <Handle type="target" position={Position.Top} id="target-top" style={{ background: "#555" }} />
        <Handle type="target" position={Position.Left} id="target-left" style={{ background: "#555" }} />
        <Handle type="target" position={Position.Right} id="target-right" style={{ background: "#555" }} />
        <Handle type="target" position={Position.Bottom} id="target-bottom" style={{ background: "#555" }} />

        <Handle type="source" position={Position.Top} id="source-top" style={{ background: "#555" }} />
        <Handle type="source" position={Position.Left} id="source-left" style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} id="source-right" style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} id="source-bottom" style={{ background: "#555" }} />


        {editing ? (
          <>
            <input
              ref={inputRef}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border px-1 py-0.5 rounded text-sm"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={descriptionToggle} className="mt-2 py-1 px-2 bg-lgreen text-xs text-white rounded-xl">Description</button>
          </>
        ) : (
          <div className="text-sm cursor-pointer">{label}</div>
        )}
      </div>
    </div>
  );
};

export default EditNode;
