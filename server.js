const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); 

app.post("/submit", (req, res) => {
  let dataFile = path.join(__dirname, "data.json");
  let existing = [];
  if (fs.existsSync(dataFile)) {
    existing = JSON.parse(fs.readFileSync(dataFile));
  }
  existing.push(req.body);
  fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));
  res.json({ message: "Form submitted successfully!" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
