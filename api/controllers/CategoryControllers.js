const Category = require("../models/model.category");
require("dotenv").config();

exports.findAllCategories = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    // get number of row
    const [nRows] = await Category.pagination(search);
    console.log(nRows)

    const totalPage = Math.ceil(nRows[0][0].TotalRows / limit);

    const [result] = await Category.searchCategory(search, limit, page);

    res.send({
      result: result[0],
      page: page,
      limit: limit,
      totalRows: nRows[0][0],
      totalPage: totalPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.createNewCategory = async (req, res, next) => {
  try {
    const [dupCategory, _] = await Category.findByName(req.body.categoryName);
    if (dupCategory.length !== 0) {
      return res.send({
        message: "Category name already exist.",
        success: false,
      });
    }

    // create new category
    let category = new Category(req.body.categoryName, req.body.desc);
    category = await category.save();

    res.status(201).json({ message: "Category created", success: true });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    // delete category
    const [result] = await Category.deleteById(req.params.id);

    if (result.affectedRows !== 0) {
      return res.send({ message: "Category has been deleted.", success: true });
    }
    // if failed
    res.send({ message: "Delete failed.", success: false });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    // check if update duplicate value
    const [dupValue] = await Category.updateDuplicate(
      req.params.id,
      req.body.categoryName
    );
    if (dupValue.length !== 0) {
      return res.send({ message: "Category already exist.", success: false });
    }

    const [result] = await Category.updateById(
      req.body.categoryName,
      req.body.desc,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      res.status(201).send({ message: "Category updated.", success: true });
    } else {
      res
        .status(200)
        .send({ message: "Category update failed.", success: false });
    }
  } catch (error) {
    next(error);
  }
};

exports.findOneById = async (req, res, next) => {
  try {
    const [category, _] = await Category.findById(req.params.id);
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
};
