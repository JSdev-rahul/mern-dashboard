const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const categories = mongoose.model("categories", categorySchema);
module.exports = categories;
