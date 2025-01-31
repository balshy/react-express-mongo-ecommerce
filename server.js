const express = require("express");
const path = require("path");
// const { PORT } = require("./config/keys");
const app = express();

require("./src/startUp/db")();
require("./src/startUp/parser")(app);
require("./src/startUp/routes")(app);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error to connect server ", err);
    process.exit(1);
  }
  console.log(`Server connected on port ${PORT}`);
});
