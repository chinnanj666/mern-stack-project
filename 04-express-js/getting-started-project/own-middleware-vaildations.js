const express = require('express');
const app = express();
const PORT = 3010;

// Authentication middleware
function checkauth(req, res, next) {
    const auth = req.header('authorization');
    if (auth === 'admin') {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.status(403).json({'message': 'Invalid credentials!'});
    }
}

// Route for '/public' with the checkauth middleware applied
app.get('/public', checkauth, (req, res) => {
    res.send('your data is secure...!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
