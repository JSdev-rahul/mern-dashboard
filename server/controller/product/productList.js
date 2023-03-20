const products = require("../../model/product");

const productList = async (req, resp) => {
  const categoryNames = req.query.product_category_in;
  
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const firstIndex = (page - 1) * limit;
  const lastIndex = page * limit;
  const paginatedArticlesList = {};
  if (firstIndex > 0) {
    paginatedArticlesList.previous = {
      previouspage: page - 1,
      limit: limit,
    };
  }
  if (lastIndex < (await products.countDocuments().exec())) {
    paginatedArticlesList.next = {
      nextpage: page + 1,
      limit: limit,
    };
  }
  try {
    let result;
    let count;
    count =await products.find({})
    if (categoryNames) {
      result = await products
        .find({ category: { $in: categoryNames } })
        .limit(limit)
        .skip(firstIndex)
        .exec();
    } else {
     
      result = await products.find().limit(limit).skip(firstIndex).exec();
    }
    resp.status(200).json({result,count:count?.length});
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};

module.exports = productList;
