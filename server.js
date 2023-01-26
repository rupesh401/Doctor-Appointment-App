const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dot env config
dotenv.config();

//mongo db connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/user", require("./routes/userRoute"));

//PORT
const port = process.env.PORT || 8080;

//Listening
app.listen(port, () => {
  console.log("Server running in on port 8080".bgCyan.white);
});
