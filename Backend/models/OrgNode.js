const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  width: { type: Number, default: 200 },
  height: { type: Number, default: 180 },
  sourcePosition: { type: String, default: 'bottom' },
  targetPosition: { type: String, default: 'top' },
  data: {
    name: { type: String, default: '' },
    designation: { type: String, default: '' },
    image: { type: String, default: null } // save as url or base64
  }
});

const EdgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['straight', 'role', 'transfer'], 
    default: 'role' 
  },
  sourceHandle: { type: String, default: null },
  targetHandle: { type: String, default: null },
  markerEnd: {
    type: { type: String, default: 'arrowclosed' },
    color: { type: String, default: '#81a73d' }
  },
  animated: { type: Boolean, default: true }
});

const TreeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  nodes: [NodeSchema],
  edges: [EdgeSchema],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
TreeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


const OrgTree = mongoose.model("OrgTree", TreeSchema);

// Export directly (not as an object)
module.exports = OrgTree;
