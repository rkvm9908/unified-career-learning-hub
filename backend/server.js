require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const http = require("http");
const {
    initializeSocket
} = require("./src/constants/socketEvents");
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        const server =
            http.createServer(app);
        initializeSocket(server);
        server.listen(PORT, () => {
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

