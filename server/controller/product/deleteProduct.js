const products = require("../../model/product");

const deleteProduct = async (req, resp) => {
  const id = req.params.id;

  try {
    const result = await products.findByIdAndDelete(id);
    resp.status(200).json({ message: "data deleted", status: 200 });
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};

module.exports=deleteProduct