const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/JobRoute");
const dotenv = require("dotenv")
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/jobs", jobRoutes);

app.listen(3000, console.log("Server started"));