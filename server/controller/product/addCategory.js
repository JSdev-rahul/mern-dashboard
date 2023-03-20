const categories = require("../../model/productCategory");

const addCategory = async (req, resp) => {
  const { categoryName } = req.body;
  try {
    const exist = await categories?.find({
      categoryName: { $in: categoryName },
    });

    if (exist?.length >= 1) {
      return resp
        .status(400)
        .json({ status: 400, message: "category name alreday exist" });
    } else {
      const newCategory = await categories.create({
        categoryName,
        createdAt: Date.now(),
      });
      await newCategory.save();
      resp.status(200).json(newCategory);
    }
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};

module.exports = addCategory;
