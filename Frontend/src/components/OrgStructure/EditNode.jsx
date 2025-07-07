import { Handle } from "reactflow";
import { useState } from "react";

function EditNode({ id, data, isEditing, setNodes, onDelete }) {
  const [name, setName] = useState(data.name || ""); // Changed from label
  const [designation, setDesignation] = useState(data.designation || ""); // Changed from description
  const [image, setImage] = useState(data.image || null);

  const handleNameChange = (evt) => { // Changed from handleLabelChange
    const newName = evt.target.value;
    setName(newName);
    updateNodeData({ name: newName }); // Changed from label
  };

  const handleDesignationChange = (evt) => { // Changed from handleDescriptionChange
    const newDesignation = evt.target.value;
    setDesignation(newDesignation);
    updateNodeData({ designation: newDesignation }); // Changed from description
  };

  const handleImageChange = (evt) => {
    const newImage = evt.target.value;
    setImage(newImage);
    updateNodeData({ image: newImage });
  };

  const updateNodeData = (newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...newData },
          };
        }
        return node;
      })
    );
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this node?")) {
      try {
        await onDelete(id); // Wait for deletion to complete
      } catch (error) {
        console.error('Deletion failed:', error);
      }
    }
  };

  return (
    <div className="p-2 border border-gray-200 rounded-md bg-white w-full h-full flex flex-col">
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" />
      
      {isEditing && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs z-10"
          title="Delete node"
        >
          ×
        </button>
      )}
      {isEditing ? (
        <div className="flex flex-col gap-2 h-full">
          {image && (
            <div className="flex justify-center">
              <img 
                src={image} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64';
                }}
              />
            </div>
          )}
          <input
            type="text"
            value={image || ''}
            onChange={handleImageChange}
            placeholder="Image URL"
            className="text-xs w-full p-1 border rounded"
          />
          <input
            className="w-full p-1 border border-gray-300 rounded font-bold text-center"
            value={name} // Changed from label
            onChange={handleNameChange} // Changed from handleLabelChange
            placeholder="Employee Name" // Updated placeholder
          />
          <textarea
            className="w-full p-1 border border-gray-300 rounded text-sm text-center"
            value={designation} // Changed from description
            onChange={handleDesignationChange} // Changed from handleDescriptionChange
            placeholder="Employee Designation" // Updated placeholder
            rows={2}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {image ? (
            <img 
              src={image} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64';
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs">No Image</span>
            </div>
          )}
          <div className="font-bold text-center">{data.name}</div> {/* Changed from label */}
          {data.designation && ( /* Changed from description */
            <div className="text-sm text-gray-600 text-center">{data.designation}</div> /* Changed from description */
          )}
        </div>
      )}
    </div>
  );
}

export default EditNode;