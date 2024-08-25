const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parses JSON bodies

// POST endpoint to process data
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!data) {
            throw new Error("No data field provided in the request body.");
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && /[a-zA-Z]/.test(item));
        const highestLowercase = alphabets
            .filter(char => char === char.toLowerCase())
            .sort()
            .pop();

        res.json({
            is_success: true,
            user_id: "john_doe_17091999",  // Example user_id, adapt as needed
            email: "john@xyz.com",        // Example email, adapt as needed
            roll_number: "ABCD123",       // Example roll number, adapt as needed
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
        });
    } catch (error) {
        console.error("Error processing request:", error.message);
        res.status(400).json({ is_success: false, message: error.message });
    }
});

// GET endpoint returns a hardcoded operation_code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});