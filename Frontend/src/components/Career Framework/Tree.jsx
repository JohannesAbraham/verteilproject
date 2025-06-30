import { useEffect, useState, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  StraightEdge
} from "reactflow";
import axios from "axios";
import "reactflow/dist/style.css";
import { nanoid } from "nanoid";

import EditNode from "./EditNode.jsx";
import { RoleEdge, TransferEdge } from "./CustomEdges.jsx";

function TreePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectEdgeType, setSelectEdgeType] = useState("role");
  const [treeName, setTreeName] = useState("");
  const [treeList, setTreeList] = useState([]);

  const nodeTypes = useMemo(() => {
    return {
      editable: (props) => (
        <EditNode
          {...props}
          isEditing={isEditing}
          setNodes={setNodes}
        />
      ),
    };
  }, [isEditing, setNodes]);

  const edgeTypes = useMemo(() => ({
    straight: StraightEdge,
    role: RoleEdge,
    transfer: TransferEdge,
  }), []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tree/trees").then((res) => {
      setTreeList(res.data.map((t) => t.name));
    });
  }, []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isEditing,
        },
      }))
    );
  }, [isEditing]);

  const handleEditClick = () => {
    const password = prompt("Enter password to edit:");
    if (password === "yoyo123") {
      setIsEditing(true);
      console.log("EDIT MODE ENTERED");
    } else {
      alert("Incorrect password");
    }
  };

  const loadTree = (name) => {
    setTreeName(name);
    axios.get(`http://localhost:5000/api/tree/${name}`).then((res) => {
      if (res.data) {
        const loadedNodes = (res.data.nodes || []).map((node) => ({
          ...node,
          type: "editable",
          data: {
            ...node.data,
            label: node.data?.label || "",
            isEditing,
          },
        }));
        setNodes(loadedNodes);
        setEdges(res.data.edges || []);
      } else {
        setNodes([]);
        setEdges([]);
      }
    });
  };

  const handleSave = () => {
    if (!treeName) return alert("Please enter a tree name");

    const cleanedNodes = nodes.map((n) => ({
      ...n,
      type: "editable",
      data: {
        label: n.data?.label || ""
      }
    }));

    axios
      .post(`http://localhost:5000/api/tree/${treeName}`, {
        nodes: cleanedNodes,
        edges
      })
      .then(() => alert(`Tree "${treeName}" saved.`));
  };

  const handleAddNode = () => {
    const newNode = {
      id: nanoid(),
      type: "editable",
      data: {
        label: `Node ${nodes.length + 1}`,
        isEditing
      },
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400
      }
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleConnect = (params) =>
    setEdges((eds) =>
      addEdge({ ...params, id: nanoid(), type: selectEdgeType }, eds)
    );

  return (
    <div className="h-screen bg-light pt-2" >
     <div className="bg-[#81a73d] text-center p-3 border-b border-[#4a6532] shadow-sm rounded-md max-w-xl mx-auto -mt-1">
  <h1 className="text-2xl text-white font-ariel font-bold tracking-wide m-0 mb-0">
    CAREER FRAMEWORK
  </h1>
</div>




      <div className="flex justify-center items-center gap-4 mt-4">
        {!isEditing ? (
          <>
            <select
              value={treeName}
              onChange={(e) => loadTree(e.target.value)}
              className="p-1 border-2 bg-light border-dgreen shadow-lg text-dgreen text-md rounded-xl font-ariel font-bold"
            >
              <option value="" disabled>Select Framework</option>
              {treeList.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <button
              onClick={handleEditClick}
              className="py-2 px-4 ml-20 bg-dgreen border-white shadow-lg text-light font-ariel font-bold rounded-xl hover:animate-bounce border-2"
            >
              EDIT
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                const name = prompt("Enter new tree name:");
                if (name) {
                  setTreeName(name);
                  setNodes([]);
                  setEdges([]);
                }
              }}
              className="px-4 py-2 bg-dgreen border-white border-2 shadow-lg text-light rounded-xl mr-50 font-bold font-ariel text-sm  hover:animate-bounce"
            >
              NEW
            </button>
            <span className=" px-4 py-1 bg-light border-dgreen border-2 shadow-lg text-dgreen rounded-xl font-bold font-ariel">
              {treeName || "Unnamed Tree"}
            </span>
            <button
              onClick={handleAddNode}
              className="px-4 py-2 bg-dgreen border-white border-2 shadow-lg text-light text-sm font-ariel font-bold rounded-xl hover:animate-bounce"
            >
              Add Node
            </button>
            <select
              value={selectEdgeType}
              onChange={(e) => setSelectEdgeType(e.target.value)}
              className="p-2 bg-white border-dgreen border-2 text-dgreen text-sm rounded-xl font-bold font-ariel"
            >
              <option value="role">Role Connection</option>
              <option value="transfer">Transfer Opportunity</option>
            </select>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-dgreen border-white border-2 shadow-lg text-light text-sm font-ariel font-bold rounded-xl hover:animate-bounce"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 ml-50 bg-red-600 text-white text-sm shadow-lg rounded-xl font-ariel font-bold"
            >
              EXIT
            </button>
          </>
        )}
      </div>

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        fitView
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'step', style: { strokeWidth: 3, stroke: '#81a73d' } }}
        nodesDraggable={isEditing}
        nodesConnectable={isEditing}
        elementsSelectable={true}
        selectNodesOnDrag={false}
        isValidConnection={()=>true}
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}

export default TreePage;