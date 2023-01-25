const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");

//dot env config
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server running successfully",
  });
});

//PORT
const port = process.env.PORT || 8080;

//Listening
app.listen(port, () => {
  console.log(
    'Server running in on port 8080'
      .bgCyan.white
  );
});
