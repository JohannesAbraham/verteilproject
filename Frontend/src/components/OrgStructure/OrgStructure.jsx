import React from 'react';
import './OrgStructure.css';
import Tree from './Tree';

const OrgStructure = () => {
  return (
    <div className="app-layout">
        <div className="main-content">
              <Tree />
        </div>
      </div>
  );
};

export default OrgStructure;