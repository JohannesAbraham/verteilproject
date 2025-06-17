import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './OrgStructure.css';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="tools">
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform()}>x</button>
    </div>
  );
};

const NodeTree = ({ label, children }) => {
  return (
    <div className="node-tree-container">
      <Tree
        lineWidth="2px"
        lineColor="#80A23F"
        lineBorderRadius="4px"
        lineHeight="36px"  
        nodePadding="4px"
        label={label}
      >
        {children && children.map((child, index) => (
          <TreeNode key={index} label={child.label} />
        ))}
      </Tree>
    </div>
  );
};

const OrganizationStructure = () => {
  return (
    <div className="org-chart-container">
      <h1 className="org-chart-title">Organization Structure</h1>
      <div className="org-chart-wrapper">
        <div className="org-chart-inner">
          <TransformWrapper
            initialScale={1}
            initialPositionX={200}
            initialPositionY={100}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <Controls />
                <TransformComponent>
                  {/* Level 1 - CEO */}
                  <div className="charts">
                  <NodeTree 
                    label={<div className="org-node root-node">Head of Organization<br /><span>CEO</span></div>}
                    children={[
                      { label: <div className="org-node">Product Head</div> },
                      { label: <div className="org-node">Technology Head</div> },
                      { label: <div className="org-node">Engineering Head</div> },
                      { label: <div className="org-node">Growth Head</div> },
                      { label: <div className="org-node">Business Development Head</div> },
                      { label: <div className="org-node">People's Operations Head</div> }
                    ]}
                  />

                  {/* Level 2 - Product Head */}
                  <div className="sub-tree">
                    <NodeTree 
                      label={<div className="org-node">Product Head</div>}
                      children={[
                        { label: <div className="org-node">BA Team</div> },
                        { label: <NodeTree 
                      label={<div className="org-node">Customer Success Team</div>}
                      children={[
                        { label: <div className="org-node">Customer Support</div> },
                        { label: <div className="org-node">Tech Support</div> }
                      ]}
                    /> },
                        { label: <div className="org-node">Account Management</div> },
                        { label: <NodeTree 
                      label={<div className="org-node">Sales</div>}
                      children={[
                        { label: <div className="org-node">Customer Onboarding</div> }
                      ]}
                    /> }
                      ]}
                    />
                  </div>

                  {/* Level 3 - BA Team */}
                  <div className="sub-tree">
                    <NodeTree 
                      label={<div className="org-node">BA Team</div>}
                      children={[
                        { label: <div className="org-node">Product</div> },
                        { label: <div className="org-node">API Integrations</div> },
                        { label: <div className="org-node">Airline Integrations</div> },
                        { label: <div className="org-node">UX Designer</div> }
                      ]}
                    />
                  </div>

                 

                  

                  {/* Level 2 - Technology Head */}
                  <div className="sub-tree">
                    <NodeTree 
                      label={<div className="org-node">Technology Head</div>}
                      children={[
                        { label: <div className="org-node">DevOps</div> },
                        { label: <div className="org-node">Tech Group</div> }
                      ]}
                    />
                  </div>

                  {/* Level 2 - Engineering Head */}
                  <div className="sub-tree">
                    <NodeTree 
                      label={<div className="org-node">Engineering Head</div>}
                      children={[
                        { label: <NodeTree 
                      label={<div className="org-node">Payment Management</div>}
                      children={[
                        { label:  <NodeTree 
                      label={<div className="org-node">Order Management</div>}
                      children={[
                        { label: <div className="org-node">Offer Management</div> }
                      ]}
                    /> }
                      ]}
                    /> },
                        { label: <NodeTree 
                      label={<div className="org-node">Admin Platform Management</div>}
                      children={[
                        { label: <NodeTree 
                      label={<div className="org-node">V4-OMS</div>}
                      children={[
                        { label: <div className="org-node">AIT Dev</div> }
                      ]}
                    /> }
                      ]}
                    /> },
                        { label: <NodeTree 
                      label={<div className="org-node">QA</div>}
                      children={[
                        { label: <div className="org-node">UI Dev</div> }
                      ]}
                    /> }
                      ]}
                    />
                  </div>

                 


                  {/* Level 2 - Growth Head */}
                  <div className="sub-tree">
                    <NodeTree 
                      label={<div className="org-node">Growth Head</div>}
                      children={[
                        { label: <div className="org-node">OC Operations</div> },
                        { label: <div className="org-node">OC Sales</div> },
                        { label: <div className="org-node">OC Dev</div> }
                      ]}
                    />
                  </div>

                  {/* Level 2 - Business Development Head */}
                  <div className="sub-tree">
                    <NodeTree 
                      label={<div className="org-node">Business Development Head</div>}
                      children={[
                        { label: <div className="org-node">Pre Sales Team</div> },
                        { label: <div className="org-node">Marketing</div> }
                      ]}
                    />
                  </div>

                  {/* Level 2 - People's Operations Head */}
                  <div className="sub-tree">
                    <NodeTree 
                      label={<div className="org-node">People's Operations Head</div>}
                      children={[
                        { label: <div className="org-node">HR Team</div> },
                        { label: <div className="org-node">Finance Team</div> },
                        { label: <div className="org-node">Operations Team</div> }
                      ]}
                    />
                  </div>
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      </div>
    </div>
  );
};

export default OrganizationStructure;