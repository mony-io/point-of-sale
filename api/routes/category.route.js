const express = require("express");
const category = require("../controllers/CategoryControllers");
const upload = require("../middlewares/uploads");

const router = express.Router();

router
  .route("/categories")
  .get(category.findAllCategories)
  .post(upload, category.createNewCategory);

router.put("/categories/:id", upload, category.updateCategory);
router.delete("/categories/:id", category.deleteCategory);
router.get("/categories/:id", category.findOneById);
module.exports = router;
