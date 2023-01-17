const Product = require("../models/model.products");
const deleteImg = require("../middlewares/deleteImage");

exports.createNewProduct = async (req, res, next) => {
  let path = "";
  if (req.file) {
    path = req.file.path;
  }

  try {
    // get product name
    const [product_name] = await Product.findProductByName(
      req.body.product_name
    );
    // check product name
    if (product_name.length !== 0) {
      if (path !== "") {
        deleteImg(path);
      }
      return res.send({
        message: "Sorry! Product name already exist.",
        success: false,
      });
    }

    // get product code
    const [product_code] = await Product.findProductCode(req.body.product_code);
    // check if product code already exist
    if (product_code.length !== 0) {
      if (path !== "") {
        deleteImg(path);
      }
      return res.send({ message: "Sorry! Product code already exist." });
    }

    let product = new Product(
      req.body.category_id,
      req.body.brand_id,
      req.body.product_code,
      req.body.product_name,
      req.body.qty,
      req.body.price_instock,
      req.body.retail_price,
      req.body.wholesale_price,
      req.body.exp_date,
      path,
      req.body.desc,
      req.body.status,
      req.body.reorder_number
    );

    product = await product.save();

    if (product[0].affectedRows !== 0) {
      res.send({ message: "Product created.", success: true });
    } else {
      if (path !== "") {
        deleteImg(path);
      }
      res.send({ message: "Product created fail.", success: false });
    }
  } catch (err) {
    next();
  }
};

exports.uppdateProduct = async (req, res, next) => {
  try {
    let path = "";
    // get path of image
    const [oldPath] = await Product.findImageById(req.params.product_id);

    if (req.file) {
      path = req.file.path;
    } else {
      path = oldPath[0].product_image;
    }

    // check duplicate by name
    const [pro_name] = await Product.findDuplicateByName(
      req.params.product_id,
      req.body.product_name
    );
    if (pro_name.length !== 0) {
      if (req.file) {
        deleteImg(path);
      }
      return res.send({
        message: "Sorry! Product name already exist.",
        success: false,
      });
    }

    // check duplicate product code
    const [pro] = await Product.findDuplicateByProductCode(
      req.params.product_id,
      product_code
    );
    if (pro.length !== 0) {
      if (req.file) {
        deleteImg(path);
      }
      return res.send({
        message: "Sorry! Product Code already exist.",
        success: false,
      });
    }

    const [result] = await Product.updateProductById(
      req.body.category_id,
      req.body.brand_id,
      req.body.product_code,
      req.body.product_name,
      req.body.qty,
      req.body.price_instock,
      req.body.retail_price,
      req.body.wholesale_price,
      req.body.exp_date,
      path,
      req.body.desc,
      req.body.status,
      req.body.reorder_number,
      req.params.product_id
    );

    if (result.affectedRows !== 0) {
      if (req.file) {
        await deleteImg(oldPath[0].product_image);
      }

      res.send({ message: "Product updated.", success: true });
    } else {
      res.send({ message: "Update failed.", success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const [products] = await Product.findAllProduct();
    res.send(products);
  } catch (err) {
    next(err);
  }
};

exports.findImgById = async (req, res, next) => {
  try {
    const [image] = await Product.findImageById(req.params.product_id);
    if (image.length !== 0) {
      // console.log(image[0]);
      res.send(image);
    } else {
      res.send({ message: "Image doesn't exist." });
    }
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    // get path of image
    const [path] = await Product.findImageById(req.params.product_id);

    const [result] = await Product.deleteById(req.params.product_id);

    if (result.affectedRows !== 0) {
      deleteImg(path[0].product_image);
      res.send({ message: "Product has been deleted.", success: true });
    } else {
      res.send({ message: "Product has been failed.", success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteImageOne = async (req, res, next) => {
  try {
    // get path of image
    const [path] = await Product.findImageById(req.params.product_id);

    const [result] = await Product.deleteImageById(req.params.product_id);
    if (result.affectedRows !== 0) {
      deleteImg(path[0].product_image);
      res.end();
    }
  } catch {
    next();
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const [product] = await Product.findProductById(req.params.product_id);
    res.send(product);
  } catch (err) {
    next(err);
  }
};
