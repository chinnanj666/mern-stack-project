// Require dependencies
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// In-memory storage
const users = [];
let todos = [];
let idCounter = 1;

// Basic Routes
// 1. Root route
app.get('/', (req, res) => {
    res.json({
        message: `Welcome to Todo API running on port ${process.env.PORT}`
    });
});

// 2. Users routes
app.get('/users', (req, res) => {
    // Get all users
    res.json(users);
});

app.post('/users', (req, res) => {
    // Create new user
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    const user = {
        id: idCounter++,
        username
    };
    users.push(user);
    res.status(201).json(user);
});

// 3. Todos routes
app.get('/todos', (req, res) => {
    // Get all todos
    res.json(todos);
});

app.post('/todos', (req, res) => {
    // Create new todo
    const { title, userId } = req.body;
    if (!title || !userId) {
        return res.status(400).json({ error: 'Title and userId are required' });
    }
    const todo = {
        id: idCounter++,
        title,
        userId,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

app.get('/users/:userId/todos', (req, res) => {
    // Get todos for specific user
    const userTodos = todos.filter(todo =>
        todo.userId === parseInt(req.params.userId)
    );
    res.json(userTodos);
});

// 4. Error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server using PORT from .env or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});