const mongoose = require('mongoose');

const OrgNodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  parentID: { type: String },
  childrenID: { type: Array },
  image: { type: Image }
});

module.exports = mongoose.model('Organization Nodes', OrgNodeSchema);