const products = require("../../model/product");
const searchProduct = async (req, resp) => {
 

  try {
    const result = await products.find({
      $or: [
        { name: { $regex: req.params.search.toLowerCase() } },
        { category: { $regex: req.params.search.toLowerCase() } },
        // { price: { $regex:req.params.search } },
      ],
    });
    resp.status(200).json(result);
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};
module.exports = searchProduct;
