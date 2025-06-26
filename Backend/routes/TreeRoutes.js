const express = require("express");
const router = express.Router();
const {Tree, Description} = require("../models/Tree");

router.get("/trees", async (req, res) => {
  const trees = await Tree.find({}, "name");
  res.json(trees);
});

router.get("/:name", async (req, res) => {
  const tree = await Tree.findOne({ name: req.params.name });
  res.json(tree);
});

router.post("/:name", async (req, res) => {
  const updated = await Tree.findOneAndUpdate(
    { name: req.params.name },
    {
      name: req.params.name,
      nodes: req.body.nodes,
      edges: req.body.edges
    },
    { upsert: true, new: true }
  );
  res.json({ message: "Tree saved", tree: updated });
});

router.get("/jobDescription/:name", async (req, res) => {
  try{
    const desc = await Description.findOne({name:req.params.name});
    if (!desc) {
      return res.status(404).json({ message: "Description not found" });
    }
    res.json(desc);
  }
  catch(e){
    console.log("Error fetching description:", e);
  }  
})

router.put("/jobDescription/:name", async (req, res) => {
  const {description,name} = req.body;

  try{
    const updated = await Description.findOneAndUpdate(
      {name:name},
      {name:name,description:description},
      { upsert: true, new: true }
    );
    res.json({message: "Description has been saved",updated});
  }
  catch(error){
    console.log("Error saving description",error);
    res.status(500).json({ message: "Error saving description" });
  }
})

module.exports = router;