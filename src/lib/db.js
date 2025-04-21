const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../../db.json");


if(!fs.existsSync(DB_PATH)){
  fs.writeFileSync(DB_PATH,JSON.stringify({users: []},null,2), "utf-8");
}

function readDatabase() {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

function writeDatabase(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readDatabase, writeDatabase };
