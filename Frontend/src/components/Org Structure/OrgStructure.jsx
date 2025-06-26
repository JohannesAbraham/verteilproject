import React from 'react';
import './OrgStructure.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  defaultProfilePic,
  profilePictures,
  teamTrees,
  teamNames,
  getTreeForTab
} from './orgstructure.js';


const TreeNode = ({ node, onExpand }) => {
  const shouldShowProfilePic = node.name && node.name.trim() !== '' && profilePictures[node.id];
  const profilePic = shouldShowProfilePic ? profilePictures[node.id] : null;

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
  // Create 30 copies of the initial tree data, with Team 2 having special structure
  const [trees, setTrees] = React.useState(
    Array.from({ length: 30 }, (_, i) => getTreeForTab(i))
  );
  
  const [activeTab, setActiveTab] = React.useState(0);

  const handleExpand = (nodeId, tabIndex) => {
    setTrees(prevTrees => {
      const newTrees = [...prevTrees];
      
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

      newTrees[tabIndex] = updateNode(newTrees[tabIndex]);
      return newTrees;
    });
  };
  
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Company Organization Structure</h1>
      </header>
      
      <div className="app-main-container">
        <div className="sidebar">
          <div className="sidebar-header">Teams</div>
          <div className="tabs">
            {teamNames.map((name, index) => (
              <button
                key={index}
                className={`tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="main-content">
          <h2>Organization Chart - {teamNames[activeTab]}</h2>
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
                    <button className='control' onClick={() => zoomIn()}>+</button>
                    <button className='control' onClick={() => zoomOut()}>-</button>
                    <button className='control' onClick={() => resetTransform()}>Reset</button>
                  </div>
                  <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                    contentStyle={{ 
                      width: "100%", 
                      minWidth: "fit-content",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start" // Align to top but center horizontally
                    }}
                  >
                    <div className="org-chart-wrapper">
                      <OrgChart 
                        data={trees[activeTab]} 
                        onExpand={(nodeId) => handleExpand(nodeId, activeTab)} 
                      />
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      </div>
      
      
    </div>
);
  
};

export default App;