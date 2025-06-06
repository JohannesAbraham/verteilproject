import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './OrgStructure.css';

const OrganizationStructure = () => {
  return (
    <div className="org-chart-container">
      <h1 className="org-chart-title">Organization Structure</h1>
      <div className="org-chart-wrapper">
        <Tree
          lineWidth="2px"
          lineColor="#80A23F"
          lineBorderRadius="4px"
          label={<div className="org-node root-node">Head of Organization<br /><span>CEO</span></div>}
        >
          {/* Product Head */}
          <TreeNode label={<div className="org-node">Product Head</div>}>
            <TreeNode label={<div className="org-node">BA Team</div>}>
              <TreeNode label={<div className="org-node">Product</div>} />
              <TreeNode label={<div className="org-node">API Integrations</div>} />
              <TreeNode label={<div className="org-node">Airline Integrations</div>} />
              <TreeNode label={<div className="org-node">UX Designer</div>} />
            </TreeNode>
            <TreeNode label={<div className="org-node">Customer Success Team</div>}>
              <TreeNode label={<div className="org-node">Customer Support</div>} />
              <TreeNode label={<div className="org-node">Tech Support</div>} />
            </TreeNode>
            <TreeNode label={<div className="org-node">Account Management</div>} />
            <TreeNode label={<div className="org-node">Sales</div>}>
              <TreeNode label={<div className="org-node">Customer Onboarding</div>} />
            </TreeNode>
          </TreeNode>

          {/* Technology Head */}
          <TreeNode label={<div className="org-node">Technology Head</div>}>
            <TreeNode label={<div className="org-node">DevOps</div>} />
            <TreeNode label={<div className="org-node">Tech Group</div>} />
          </TreeNode>

          {/* Engineering Head */}
          <TreeNode label={<div className="org-node">Engineering Head</div>}>
            <TreeNode label={<div className="org-node">Payment Management</div>} />
            <TreeNode label={<div className="org-node">Order Management</div>} />
            <TreeNode label={<div className="org-node">Offer Management</div>} />
            <TreeNode label={<div className="org-node">Admin Platform Management</div>} />
            <TreeNode label={<div className="org-node">V4-OMS</div>} />
            <TreeNode label={<div className="org-node">AIT Dev</div>} />
            <TreeNode label={<div className="org-node">QA</div>} />
            <TreeNode label={<div className="org-node">UI Dev</div>} />
          </TreeNode>

          {/* Growth Head */}
          <TreeNode label={<div className="org-node">Growth Head</div>}>
            <TreeNode label={<div className="org-node">OC Operations</div>} />
            <TreeNode label={<div className="org-node">OC Sales</div>} />
            <TreeNode label={<div className="org-node">OC Dev</div>} />
          </TreeNode>

          {/* Business Development Head */}
          <TreeNode label={<div className="org-node">Business Development Head</div>}>
            <TreeNode label={<div className="org-node">Pre Sales Team</div>} />
            <TreeNode label={<div className="org-node">Marketing</div>} />
          </TreeNode>

          {/* People's Operations Head */}
          <TreeNode label={<div className="org-node">People's Operations Head</div>}>
            <TreeNode label={<div className="org-node">HR Team</div>} />
            <TreeNode label={<div className="org-node">Finance Team</div>} />
            <TreeNode label={<div className="org-node">Operations Team</div>} />
          </TreeNode>
        </Tree>
      </div>
    </div>
  );
};

export default OrganizationStructure;