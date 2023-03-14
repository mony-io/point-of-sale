const express = require("express");
const router = express.Router();
const backup = require("../backup/backupdb");

router.get("/api/backup", backup.backup);
router.post("/api/restore", backup.upload, backup.restore);

module.exports = router;
