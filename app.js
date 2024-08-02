const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.sort().reverse()[0] || '';

    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
