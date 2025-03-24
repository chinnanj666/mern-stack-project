const express = require('express');
const router = express.Router();

// In-memory data for users and their todos
let users = {
    1: {
        id: 1,
        name: 'John Doe',
        todos: {
            1: { id: 1, task: 'Learn Express', completed: false },
            2: { id: 2, task: 'Build a Todo app', completed: false }
        }
    },
    2: {
        id: 2,
        name: 'Jane Smith',
        todos: {
            1: { id: 1, task: 'Prepare presentation', completed: true },
            2: { id: 2, task: 'Clean the house', completed: false }
        }
    }
};

// Get all todos for a user
router.get('/', (req, res) => {
    const user = users[req.params.userId];
    if (!user) return res.status(404).send('User not found');
    res.json(Object.values(user.todos));  // Return all todos for this user
});

// Get a specific todo for a user
router.get('/:todoId', (req, res) => {
    const user = users[req.params.userId];
    if (!user) return res.status(404).send('User not found');
    const todo = user.todos[req.params.todoId];
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// Create a new todo for a user
router.post('/', (req, res) => {
    const user = users[req.params.userId];
    if (!user) return res.status(404).send('User not found');

    const { task, completed } = req.body;
    const todoId = Object.keys(user.todos).length + 1;  // Generate new todo ID
    const newTodo = {
        id: todoId,
        task: task,
        completed: completed || false
    };

    user.todos[todoId] = newTodo;
    res.status(201).json(newTodo);
});

// Update a todo for a user
router.put('/:todoId', (req, res) => {
    const user = users[req.params.userId];
    if (!user) return res.status(404).send('User not found');

    const todo = user.todos[req.params.todoId];
    if (!todo) return res.status(404).send('Todo not found');

    const { task, completed } = req.body;
    todo.task = task || todo.task;
    todo.completed = completed !== undefined ? completed : todo.completed;

    res.json(todo);
});

// Delete a todo for a user
router.delete('/:todoId', (req, res) => {
    const user = users[req.params.userId];
    if (!user) return res.status(404).send('User not found');

    const todo = user.todos[req.params.todoId];
    if (!todo) return res.status(404).send('Todo not found');

    delete user.todos[req.params.todoId];
    res.status(204).send();  // No content
});

module.exports = router;
