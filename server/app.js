require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn.js")
const Products = require("./models/productsSchema.js")
const DefaultData = require("./defaultdata.js")
const cors = require("cors")
const router = require("./routes/router.js")
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));
app.use(router);

const port = 8080;

app.listen(port,() => {
    console.log(`server is running on port ${port}`);
})

DefaultData();