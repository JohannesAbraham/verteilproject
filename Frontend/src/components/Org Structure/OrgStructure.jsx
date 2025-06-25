import React from 'react';
import './OrgStructure.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// Placeholder image URLs - replace these with actual image paths or imports
const defaultProfilePic = 'https://via.placeholder.com/50';
const profilePictures = {
  '1': 'https://randomuser.me/api/portraits/men/1.jpg', // Jerrin Jos
  '2': 'https://randomuser.me/api/portraits/men/2.jpg', // Satheesh Satchit
  '3': 'https://randomuser.me/api/portraits/men/3.jpg', // Nevin Perumana
  '4': 'https://randomuser.me/api/portraits/men/4.jpg', // Vinod S
  '5': 'https://randomuser.me/api/portraits/men/5.jpg', // Abdul Bijur
  '6': 'https://randomuser.me/api/portraits/men/6.jpg', // Prajoth Kumar
  '7': 'https://randomuser.me/api/portraits/men/7.jpg', // Idicula Philip
};

const TreeNode = ({ node, onExpand }) => {
  const shouldShowProfilePic = node.name && node.name.trim() !== '';
  const profilePic = shouldShowProfilePic 
    ? (profilePictures[node.id] || defaultProfilePic)
    : null;

  return (
    <div className="node">
      <div className="node-content">
        {shouldShowProfilePic && (
          <img 
            src={profilePic} 
            alt={`${node.name}'s profile`} 
            className="node-avatar"
          />
        )}
        <div className={`node-info ${!shouldShowProfilePic ? 'no-avatar' : ''}`}>
          {node.name && <div className="node-name">{node.name}</div>}
          <div className="node-title">{node.title}</div>
        </div>
        {node.children && node.children.length > 0 && (
          <button 
            className="expand-button" 
            onClick={() => onExpand(node.id)}
          >
            {node.expanded ? '−' : '+'}
          </button>
        )}
      </div>
      {node.expanded && node.children && (
        <div className="children">
          {node.children.map(child => (
            <TreeNode 
              key={child.id} 
              node={child} 
              onExpand={onExpand} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OrgChart = ({ data, onExpand }) => {
  return (
    <div className="org-chart">
      <TreeNode node={data} onExpand={onExpand} />
    </div>
  );
};

const App = () => {
  const [treeData, setTreeData] = React.useState({
    id: '1',
    title: 'CEO',
    name:'Jerrin Jos',
    expanded: false,
    children: [
      {
        id: '2',
        title: 'Product',
        name:'Satheesh Satchit',
        expanded: false,
        children: [
          { id: '8', title: 'BA Team', name:'' },
          { id: '9', title: 'Customer Success', name:'' },
          { id: '10', title: 'Account Management', name:'' },
          { id: '11', title: 'Sales', name:'' },
        ]
      },
      {
        id: '3',
        title: 'Technology',
        name:'Nevin Perumana',
        expanded: false,
        children: [
          { id: '12', title: 'DevOps', name:'' },
          { id: '13', title: 'Tech Group', name:'' }
        ]
      },
      {
        id: '4',
        title: 'Engineering',
        name:'Vinod S',
        expanded: false,
        children: [
          { id: '14', title: 'Offer Management', name:'' },
          { id: '15', title: 'Order Management', name:'' },
          { id: '16', title: 'Payment Management', name:'' },
          { id: '17', title: 'Admin Platform Management', name:'' },
          { id: '18', title: 'V4 -OMS', name:'' },
          { id: '19', title: 'AIT Dev', name:'' },
        ]
      },
      {
        id: '5',
        title: 'Growth',
        name:'Abdul Bijur',
        expanded: false,
        children: [
          { id: '20', title: 'OC Operations', name:'' },
          { id: '21', title: 'OC Sales', name:'' },
          { id: '22', title: 'OC Dev', name:'' },
        ]
      },
      {
        id: '6',
        title: 'Business Development',
        name:'Prajoth Kumar',
        expanded: false,
        children: [
          { id: '23', title: 'Pre Sales Team', name:'' },
          { id: '24', title: 'Marketing', name:'' }
        ]
      },
      {
        id: '7',
        title: 'People Operations',
        name:'Idicula Philip',
        expanded: false,
        children: [
          { id: '25', title: 'HR Team', name:'' },
          { id: '26', title: 'Finance Team', name:'' },
          { id: '27', title: 'Operations Team', name:'' },
        ]
      },
    ]
  });

  const handleExpand = (nodeId) => {
    const updateNode = (node) => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNode)
        };
      }
      return node;
    };

    setTreeData(updateNode(treeData));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Organization Chart</h1>
      <div className="org-chart-container">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={2}
          wheel={{ step: 0.08 }}
          doubleClick={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="controls">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>Reset</button>
              </div>
              <TransformComponent wrapperClass="transform-wrapper">
                <div className="org-chart-wrapper">
                  <OrgChart data={treeData} onExpand={handleExpand} />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default App;