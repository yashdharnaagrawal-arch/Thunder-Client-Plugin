const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
])

const connectDB = require("./config/db")

const express = require("express");

const app = express();

connectDB();

app.use(express.json());

app.use("/", require("./routes/userRoutes"));

app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})
