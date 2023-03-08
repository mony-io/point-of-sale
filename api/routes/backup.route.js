const express = require("express");
const router = express.Router();
const backup = require("../backup/backupdb");

router.get("/api/backup", backup.backup);
router.get("/api/restore", backup.restore);

module.exports = router;
