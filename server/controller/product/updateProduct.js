const products = require("../../model/product");

const updateProduct = async (req, resp) => {
  const { name, price, category } = req.body;
  
  try {
    const result = await products.updateOne(
      { _id: req.params.id },
      {
        $set: { name, price, category },
      }
    );
    await resp.status(200).json(result);
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};
module.exports = updateProduct;
