const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const apiList = require("./apis");

const app = express();
const PORT = 3000;

app.get("/ping", (req, res) => {
    res.json({
        success: true,
        message: 'Server is alive 👋'
    });
});

// Function to call all APIs in parallel
const callAllApis = async () => {
    try {
        await Promise.allSettled(
            apiList.map(api => axios.get(api.url))
        );
    } catch (err) {
        console.error("Unexpected error:", err.message);
    }
};

// Cron job every 15 minutes
cron.schedule("*/15 * * * *", callAllApis);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
