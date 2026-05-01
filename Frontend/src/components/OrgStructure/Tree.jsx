import { useEffect, useState, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  StraightEdge,
  Handle
} from "reactflow";
import axios from "axios";
import "reactflow/dist/style.css";
import { nanoid } from "nanoid";
import EditNode from "./EditNode.jsx";
import { RoleEdge } from "./CustomEdges.jsx";

// Define edge types outside component
const edgeTypes = {
  role: RoleEdge,
};

function TreePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [treeName, setTreeName] = useState("");
  const [treeList, setTreeList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized node types
  const nodeTypes = useMemo(() => ({
  editable: (props) => (
    <EditNode 
      {...props} 
      isEditing={isEditing} 
      setNodes={setNodes}
      onDelete={handleDeleteNode}
    />
  ),
}), [isEditing, setNodes]);

  // Check admin status
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/is-admin", { 
          withCredentials: true 
        });
        setIsAdmin(res.data.isAdmin);
      } catch (err) {
        console.error("Failed to fetch admin status:", err);
        setIsAdmin(false);
      }
    };
    fetchAdminStatus();
  }, []);

  // Fetch list of available trees
  useEffect(() => {
    const fetchTreeList = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orgtrees/trees");
        setTreeList(res.data.map(t => t.name));
      } catch (err) {
        console.error("Failed to fetch tree list:", err);
        setTreeList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTreeList();
  }, []);

  // Load a specific tree
  const loadTree = async (name) => {
  if (!name) return;
  
  setIsLoading(true);
  try {
    const res = await axios.get(`http://localhost:5000/api/orgtrees/trees/${name}`);
    
    if (res.data) {
      const loadedNodes = res.data.nodes.map(node => ({
        ...node,
        type: "editable",
        data: {
          ...node.data,
          isEditing,
        },
        sourcePosition: node.sourcePosition || 'bottom',
        targetPosition: node.targetPosition || 'top',
      }));

      const loadedEdges = res.data.edges.map(edge => ({
        ...edge,
        markerEnd: edge.markerEnd || { type: 'arrowclosed', color: '#81a73d' },
        animated: edge.animated !== undefined ? edge.animated : true,
      }));

      setNodes(loadedNodes);
      setEdges(loadedEdges);
      setTreeName(name);
    }
  } catch (err) {
    console.error(`Failed to load tree ${name}:`, err);
    alert(`Failed to load tree: ${err.message}`);
  } finally {
    setIsLoading(false);
  }
};

  // Save the current tree
  const handleSave = async () => {
  if (!treeName) {
    alert("Please enter a tree name");
    return;
  }

  try {
    const treeData = {
      name: treeName,
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          name: node.data?.name || "",
          designation: node.data?.designation || "",
          image: node.data?.image || null
        }
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type
      }))
    };

    await axios.put(
      `http://localhost:5000/api/orgtrees/trees/${treeName}`,
      treeData,
      { withCredentials: true }
    );
    alert(`Tree "${treeName}" saved successfully!`);
  } catch (err) {
    console.error("Failed to save tree:", err);
    alert(`Failed to save tree: ${err.response?.data?.message || err.message}`);
  }
};

  // Create a new empty tree
  const createNewTree = async (name) => {
    if (!name) return;

    try {
      const newTree = {
        name,
        nodes: [],
        edges: []
      };

      await axios.post(`http://localhost:5000/api/orgtrees/trees/${name}`, newTree);
      setTreeName(name);
      setNodes([]);
      setEdges([]);
      
      // Refresh the tree list
      const res = await axios.get("http://localhost:5000/api/tree/trees");
      setTreeList(res.data.map(t => t.name));
      
    } catch (err) {
      console.error("Failed to create new tree:", err);
      alert(`Failed to create tree: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEditClick = () => {
    if (isAdmin) {
      setIsEditing(true);
    } else {
      const password = prompt("Enter password to edit:");
      if (password === "yoyo123") {
        setIsEditing(true);
      } else {
        alert("Incorrect password");
      }
    }
  };

  const handleAddNode = () => {
    const newNode = {
      id: nanoid(),
      type: "editable",
      data: {
        name: `Employee ${nodes.length + 1}`,
        designation: "",
        image: null,
        isEditing
      },
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400
      },
      width: 200,
      height: 180,
      sourcePosition: 'bottom',
      targetPosition: 'top',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleDeleteNode = async (nodeId) => {
  if (!isEditing) return;
  
  // Remove the node
  setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  
  // Remove any connected edges
  setEdges((eds) => eds.filter(
    (edge) => edge.source !== nodeId && edge.target !== nodeId
  ));

  try {
    await axios.delete(
      `http://localhost:5000/api/orgtrees/trees/${treeName}/nodes/${nodeId}`,
      { withCredentials: true }
    );
     console.log('Node deleted successfully');
  }
   catch (err) {
    console.error('Failed to delete node:', err);
    
    // Revert UI if deletion failed
    const res = await axios.get(
      `http://localhost:5000/api/orgtrees/trees/${treeName}`
    );
    setNodes(res.data.nodes);
    setEdges(res.data.edges);
    
    alert('Failed to delete node. Please try again.');
    };
  }

  const handleConnect = (params) => {
    const newEdge = {
      ...params,
      id: `edge-${params.source}-${params.target}-${Date.now()}`,
      type: "role",
      markerEnd: { type: 'arrowclosed', color: '#81a73d' },
      animated: true,
    };
    setEdges((eds) => addEdge(newEdge, eds));
  };

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen bg-light pt-2">
      <div className="bg-[#81a73d] text-center p-3 border-b border-[#4a6532] shadow-sm rounded-md max-w-xl mx-auto -mt-1">
        <h1 className="text-2xl text-white font-ariel font-bold tracking-wide m-0 mb-0">
          ORGANIZATION STRUCTURE
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
              <option value="" disabled>Select Structure</option>
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
              onClick={
                () => {
                  const name = prompt("Enter new tree name:");
                  if (name) createNewTree(name);
                }
              }
              className="px-4 py-2 bg-dgreen border-white border-2 shadow-lg text-light rounded-xl mr-50 font-bold font-ariel text-sm hover:animate-bounce"
            >
              NEW
            </button>
            <span className="px-4 py-1 bg-light border-dgreen border-2 shadow-lg text-dgreen rounded-xl font-bold font-ariel">
              {treeName || "Unnamed Tree"}
            </span>
            <button
              onClick={handleAddNode}
              className="px-4 py-2 bg-dgreen border-white border-2 shadow-lg text-light text-sm font-ariel font-bold rounded-xl hover:animate-bounce"
            >
              Add Node
            </button>
            
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
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        defaultEdgeOptions={{
          type: 'role',
          style: { stroke: '#81a73d', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed', color: '#81a73d' },
          animated: true,
        }}
        nodesDraggable={isEditing}
        nodesConnectable={isEditing}
        elementsSelectable={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default TreePage;