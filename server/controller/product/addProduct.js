const products = require("../../model/product");

const addProduct = async (req, resp) => {
  const { name, category, price } = req.body;
  try {
    const result = await products.create({
      name,
      category,
      price,
      createdAt: Date.now(),
    });
    await result.save();
    resp.status(201).json(result);
  } catch (err) {
    return resp.status(500).json(err.message);
  }
};
module.exports=addProduct