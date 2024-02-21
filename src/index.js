const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, function() {
    console.log("server running...");  
});