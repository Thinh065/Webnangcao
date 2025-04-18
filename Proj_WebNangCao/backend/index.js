const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(cookieParser())

// Add a simple test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running correctly' });
});

app.use("/api",router)

const PORT = process.env.PORT || 8081

const startServer = async () => {
    try {
        await connectDB();
        console.log("Connected to DB");

        const server = app.listen(PORT, () => {
            console.log("Server is running on port " + PORT);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}`);
                server.close();
                app.listen(PORT + 1, () => {
                    console.log(`Server is now running on port ${PORT + 1}`);
                });
            } else {
                console.error('Server error:', error);
            }
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
