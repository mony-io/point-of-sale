const express = require("express");
const router = express.Router();
const backup = require("../backup/backupdb");

router.get("/backup", backup.backup);
router.get("/restore", backup.restore);

module.exports = router;
