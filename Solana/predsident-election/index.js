const path = require("path");
const express = require("express");
const cors = require('cors')
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "app/build")));
// app.use(cors(),express.static(path.resolve(__dirname, "app/public")));

app.get("*", (req, res) => {
  console.log("hello get");
  res.sendFile(path.resolve(__dirname, "app/build", "index.html"));
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "app/public", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});