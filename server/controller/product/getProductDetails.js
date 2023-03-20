const products = require("../../model/product");

const getProductDetails = async (req, resp) => {
  const id = req.params.id;
  try {
    const result = await products.findById(id);
    resp.status(200).json(result);
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};
module.exports=getProductDetails