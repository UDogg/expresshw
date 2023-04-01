
// In ./index.js

console.log("Hello, World!");
const express = require("express");
const morgan = require("morgan");
const port = 8080;
const app = express();
app.use(express.json());
app.use(morgan("dev"));
require("./routes/DLR")(app);









































app.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`);
});