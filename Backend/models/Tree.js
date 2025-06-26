const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  id: String,
  data: { label: String },
  position: Object,
  type: String
});

const EdgeSchema = new mongoose.Schema({
  id: String,
  source: { type: String, required: true },
  target: { type: String, required: true },
  type: { type: String, default: "straight" },
  sourceHandle: { type: String, default: null },
  targetHandle: { type: String, default: null }
});

const TreeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  nodes: [NodeSchema],
  edges: [EdgeSchema]
});

const DescriptionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true }
})

const Tree = mongoose.model("Tree", TreeSchema);
const Description = mongoose.model("Description", DescriptionSchema);

module.exports = {
  Tree,
  Description
};