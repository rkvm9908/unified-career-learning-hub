const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

// Routes
const routes = require("./routes");
app.use("/api", routes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Default Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Unified Career & Learning Hub Backend API is Running 🚀"
    });
});
// 404 Middleware
app.use(notFound);

// Global Error Middleware
app.use(errorHandler);

module.exports = app;
