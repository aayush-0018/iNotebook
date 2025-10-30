const express = require("express");
const connectMongo = require("./db");
var cors = require("cors");

connectMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
