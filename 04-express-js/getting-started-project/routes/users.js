const express = require('express');
const router = express.Router();

// In-memory data to store users
let users = {
    1: { id: 1, name: 'John Doe', todos: {} },
    2: { id: 2, name: 'Jane Smith', todos: {} }
};

// Get all users
router.get('/', (req, res) => {
    res.json(Object.values(users));  // Convert the dictionary to an array
});

// Get a user by ID
router.get('/:id', (req, res) => {
    const user = users[req.params.id];
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// Add a new user
router.post('/', (req, res) => {
    const { name } = req.body;
    const newId = Object.keys(users).length + 1;
    const newUser = {
        id: newId,
        name: name,
        todos: {}
    };
    users[newId] = newUser;
    res.status(201).json(newUser);
});

module.exports = router;
