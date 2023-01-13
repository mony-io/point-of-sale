const Category = require("../models/model.category");
const deleteImg = require("../middlewares/deleteImage");
require("dotenv").config();

// get path function
async function getPath(id) {
  const [path, _] = await Category.findById(id);
  if (path.length === 0) {
    return;
  }
  return path[0].photo;
}

// check update duplicate function
const avoidUpdateDuplicate = async (_id, categoryName) => {
  const [dupValue, _] = await Category.updateDuplicate(_id, categoryName);
  const [id] = await Category.findById(_id);
  if (dupValue.length !== 0 && id.length !== 0) {
    return true;
  } else {
    return;
  }
};

exports.findAllCategories = async (req, res, next) => {
  try {
    const [categories, _] = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    next(error);
  }
};

exports.createNewCategory = async (req, res, next) => {
  try {
    let image = "";

    if (req.file) {
      image = req.file.path;
    }

    console.log(req.file);
    // check duplicate category
    const [dupCategory, _] = await Category.findByName(req.body.categoryName);
    if (dupCategory.length !== 0) {
      if (image !== "") {
        await deleteImg(image);
      }
      return res.status(201).send({ message: "Category name already exist." });
    }

    // create new category
    let category = new Category(req.body.categoryName, req.body.desc, image);
    category = await category.save();

    res.status(201).json({ message: "Category created" });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    // get path of image
    const path = await getPath(req.params.id);

    // delete category
    const [result] = await Category.deleteById(req.params.id);

    if (result.affectedRows !== 0) {
      if (path !== "") {
        await deleteImg(path); // remove image from folder
      }
      return res.status(200).send({ message: "Category has been deleted." });
    }
    // if failed
    res.status(201).send({ message: "Delete failed." });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    // get path of image
    const path = await getPath(req.params.id);

    // variable to store image path
    let image = "";

    if (req.file) {
      image = req.file.path;
    } else {
      if (path !== "") {
        deleteImg(path);
      }
    }

    // check if update duplicate value
    const dupValue = await avoidUpdateDuplicate(
      req.params.id,
      req.body.categoryName
    );
    if (dupValue) {
      if (image !== "") {
        deleteImg(image);
      }
      return res.status(200).send({ message: "Category already exist." });
    }

    const [result] = await Category.updateById(
      req.body.categoryName,
      req.body.desc,
      image,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      if (path !== "" && image !== "") {
        deleteImg(path);
      }
      res.status(201).send({ message: "Category updated." });
    } else {
      if (image !== "") {
        deleteImg(image);
      }
      res.status(200).send({ message: "Category update failed." });
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
