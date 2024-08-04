const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json()); // Ensure body-parser is used

// POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            console.error('Invalid data format:', data);
            return res.status(400).json({ 
                is_success: false, 
                message: 'Invalid input format. Expected an array.' 
            });
        }

        const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
        const alphabets = data.filter(item => isNaN(item) && item.trim() !== '');

        const highestAlphabet = alphabets
            .map(item => item.toUpperCase())
            .sort()
            .reverse()[0] || '';

        res.json({
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet ? [highestAlphabet] : []
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: 'Internal Server Error'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
