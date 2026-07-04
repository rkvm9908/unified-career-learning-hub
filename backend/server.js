require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log("=================================");
            console.log(`🚀 Server Running`);
            console.log(`🌐 http://localhost:${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
            console.log("=================================");
        });
    } catch (error) {
        console.error("❌ Failed to Start Server : ", error.message);
        process.exit(1);
    }
};

startServer();

