const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const userRouter = require("./routers/user-router");

const app = express();
const clientUrl = process.env.CLIETN_URL || "http://localhost:3000";
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.static("client"));
app.use(cors({
    origin: clientUrl,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api/users", userRouter);

module.exports = app;