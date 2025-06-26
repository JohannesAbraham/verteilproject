import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { useNavigate } from "react-router-dom";

const EditNode = ({ id, data, selected, setNodes }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "");
  const inputRef = useRef(null);
  const clickTimer = useRef(false);
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

  const handleSingleClick = (e) => {
    e.stopPropagation();
    if (clickTimer.current) return;

    clickTimer.current = setTimeout(() => {
      navigate(`/job/${encodeURIComponent(label)}?editing=false`);
      console.log("Single Clicked Node");
      clickTimer.current = null;
    },5000)
  }

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    clearTimeout(clickTimer.current);
    clickTimer.current = null;
    setEditing(true);
    console.group("Double Clicked Node")
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
        onClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
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
