const categories = require("../../model/productCategory");

const categoryList = async (req, resp) => {
  try {
    const result = await categories.find({});
    resp.status(200).json({ data: result });
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};
module.exports = categoryList;
