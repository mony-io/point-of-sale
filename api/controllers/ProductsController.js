const Product = require("../models/model.products");
const deleteImg = require("../middlewares/deleteImage");
const fs = require("fs");

exports.createNewProduct = async (req, res, next) => {
  let path = "";
  if (req.file) {
    path = req.file.path;
  }

  let expDate = req.body.exp_date;
  if (expDate === "") {
    expDate = null;
  }
  // console.log(req.file);
  //console.log(req.body);
  try {
    // get product name
    const [product_name] = await Product.findProductByName(
      req.body.product_name
    );

    //console.log(product_name);
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
    //console.log(product_code);

    // check if product code already exist
    if (product_code.length !== 0) {
      if (path !== "") {
        deleteImg(path);
      }
      return res.send({ message: "Sorry! Product code already exist." });
    }

    //console.log(path);

    let product = new Product(
      req.body.category_id,
      req.body.brand_id,
      req.body.sub_id,
      req.body.unit_id,
      req.body.product_code,
      req.body.product_name,
      req.body.qty,
      req.body.unit_price,
      req.body.price,
      expDate,
      path,
      req.body.desc,
      req.body.status,
      req.body.reorder_number
    );

    product = await product.save();
    //console.log(product);

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
    let expDate = req.body.exp_date;
    if (expDate === "") {
      expDate = null;
    }
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
        //deleteImg(path);
      }
      return res.send({
        message: "Sorry! Product name already exist.",
        success: false,
      });
    }

    // check duplicate product code
    const [pro] = await Product.findDuplicateByProductCode(
      req.params.product_id,
      req.body.product_code
    );
    if (pro.length !== 0) {
      if (req.file) {
        //deleteImg(path);
      }
      return res.send({
        message: "Sorry! Product Code already exist.",
        success: false,
      });
    }

    const [result] = await Product.updateProductById(
      req.body.category_id,
      req.body.brand_id,
      req.body.sub_id,
      req.body.product_code,
      req.body.product_name,
      req.body.qty,
      req.body.unit_price,
      req.body.price,
      expDate,
      path,
      req.body.desc,
      req.body.status,
      req.body.reorder_number,
      req.params.product_id
    );

    if (result.affectedRows !== 0) {
      if (req.file) {
        // await deleteImg(oldPath[0].product_image);
      }

      res.send({ message: "ការប្រែជោគជ័យ!", success: true });
    } else {
      res.send({ message: "Update failed.", success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    // get number of row
    const [nRows] = await Product.pagination(search);
    console.log(nRows)

    const totalPage = Math.ceil(nRows[0][0].TotalRows / limit);

    const [result] = await Product.searchProduct(search, limit, page);

    //const [products] = await Product.findAllProduct();

    result[0].map((item) => {
      if (item.product_image !== "") {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode("./" + item.product_image);
      }
    });

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
      //deleteImg(path[0].product_image);
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
      //deleteImg(path[0].product_image);
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

exports.queryProductByName = async (req, res, next) => {
  if (!req.query.q) {
    return res.end();
  }
  console.log(req.query);
  try {
    const [product] = await Product.findProductByName(req.query.q);
    console.log(product);
    if (product.length !== 0) {
      res.send({
        message: "ផលិតផលមាននៅក្នុងប្រព័ន្ធរួចរាល់ហើយ!",
        success: false,
      });
    } else {
      res.send({ message: "", success: true });
    }
  } catch (err) {
    next(err);
  }
};

exports.queryProductByProductCode = async (req, res, next) => {
  if (!req.query.q) {
    return;
  }
  try {
    const [product] = await Product.findProductCode(req.query.q);
    if (product.length !== 0) {
      res.send({
        message: "Product Code already exist.Please! try another once.",
        success: false,
      });
    } else {
      res.send({ message: "", success: true });
    }
  } catch (err) {
    next(err);
  }
};

// encode image to base64
function base64_encode(file) {
  try {
    return "data:image/png;base64," + fs.readFileSync(file, "base64");
  } catch (err) {}
}

exports.productCard = async (req, res, next) => {
  try {
    const [proCard] = await Product.productCard();

    proCard.map((item) => {
      if (item.product_image !== "") {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode("./" + item.product_image);
      }
    });
    res.send(proCard);
  } catch (err) {
    next(err);
  }
};

exports.findByProcode = async (req, res, next) => {
  try {
    console.log(req.body);
    const [product] = await Product.findByProcode(req.params.productcode);

    product.map((item) => {
      if (item.product_image !== "") {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode("./" + item.product_image);
      }
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
};

exports.ProductReports = async (req, res, next) => {
  try {
    const [result] = await Product.productReports();
    res.send(result);
  } catch (err) {
    next(err);
  }
};
