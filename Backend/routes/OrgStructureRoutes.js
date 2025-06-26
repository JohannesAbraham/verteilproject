const express = require('express');
const router = express.Router();
const OrgNodeModel = require('../models/OrgNode');

const generateUniqueId = () => Math.random().toString(36).substr(2, 9)

// Get All Organization Nodes
router.get("/", async (req,res) => {
    try {
        const nodes = await OrgNodeModel.find(); 
        res.json(nodes);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

// Add a new node
router.post('/', async (req, res) => {
  try {
    await OrgNodeModel(req.body).save();
    res.json({ message: "New Node Added Successfully!", node:req.body });
    console.log({ message: "New Node Added Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedOrgNode = await OrgNodeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    
    if (!updatedOrgNode) {
      return res.status(404).json({ message: "Organization Node not found" });
    }
    
    res.json({ 
      message: "Organization Node Updated Successfully!",
      article: updatedOrgNode
    });
    console.log({ message: "Organization Structure Updated Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedOrgNode = await OrgNodeModel.findByIdAndDelete(req.params.id);
    
    if (!deletedOrgNode) {
      return res.status(404).json({ message: "Organization Node not found" });
    }
    
    res.json({ 
      message: "Organization Node Deleted Successfully!",
      article: deletedOrgNode
    });
    console.log({ message: "Organization Node Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
});

// Gets the title of a member from the organization ID passed through
router.get("/:orgId", async (req, res) => {
  try {
      const orgId = req.params.orgId;
      
      // Fetch existing organization data from the database
      let existingOrgData = await titleService.findByOrgId(orgId);
      
      if (existingOrgData) {
          // Organization data exists, return it or process further
          return res.status(200).json(existingOrgData);
      } else {
          // No existing organization found for the provided orgId
          return res.status(404).json({ message: "Organization not found" });
      }
  } catch (error) {
      // Handle any errors
      return res.status(500).json({ error: error.message });
  }
});