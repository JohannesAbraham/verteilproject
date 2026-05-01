const express = require('express');
const router = express.Router();
const OrgTree = require('../models/OrgNode');

// Get all org trees
router.get('/trees', async (req, res) => {
  try {
    const trees = await OrgTree.find({}, 'name');
    res.json(trees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save/update org tree
router.post('/trees/:name', async (req, res) => {
  try {
    const { nodes, edges } = req.body;
    const updated = await OrgTree.findOneAndUpdate(
      { name: req.params.name },
      { nodes, edges },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get specific org tree
router.get('/trees/:name', async (req, res) => {
  try {
    const tree = await OrgTree.findOne({ name: req.params.name });
    if (!tree) return res.status(404).json({ error: 'Tree not found' });
    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// In OrgStructureRoutes.js, change POST to PUT for updates
router.put('/trees/:name', async (req, res) => {
  try {
    const { nodes, edges } = req.body;
    const updated = await OrgTree.findOneAndUpdate(
      { name: req.params.name },
      { nodes, edges },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/trees/:treeName/nodes/:nodeId', async (req, res) => {
  try {
    const { treeName, nodeId } = req.params;
    
    // Find the tree
    const tree = await OrgTree.findOne({ name: treeName });
    if (!tree) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    // Remove the node
    tree.nodes = tree.nodes.filter(node => node.id !== nodeId);
    
    // Remove connected edges
    tree.edges = tree.edges.filter(
      edge => edge.source !== nodeId && edge.target !== nodeId
    );

    // Save the updated tree
    await tree.save();
    res.json({ success: true, tree });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;