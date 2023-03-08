const fs = require("fs");
const spawn = require("child_process").spawn;
const { exec } = require("child_process");
const path = require("path");

const location = path.basename("./dbbackup");

module.exports.backup = (req, res, next) => {
  const location = path.basename("./dbbackup");
  const wstream = fs.createWriteStream(
    location + `/${process.env.DB_NAME}.sql`
  );
  const mysqldump = spawn("mysqldump", [
    "-u",
    process.env.DB_USER,
    process.env.DB_NAME,
  ]);
  mysqldump.stdout
    .pipe(wstream)
    .on("finish", function () {
      console.log("Completed");
      //console.log(location + `/${process.env.DB_NAME}.sql`);
      res.download(location + `/${process.env.DB_NAME}.sql`);
    })
    .on("error", function (err) {
      res.send(err);
      console.log(err);
    });
};

module.exports.restore = (req, res, next) => {
  exec(
    `mysql -u ${process.env.DB_USER} -h ${process.env.DB_HOST} ${
      process.env.DB_NAME
    } < ${location + `/${process.env.DB_NAME}.sql`}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        next(err);
        return;
      }
      res.send("ok");
      console.log(`The import has finished.`);
    }
  );
};
