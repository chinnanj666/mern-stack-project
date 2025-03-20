const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // ✅ Define app first
app.use(bodyParser.json());

function resetTodos() {
    return [
        { id: 1, task: 'Buy groceries' },
        { id: 2, task: 'Walk the dog' }
    ];
}

let todos = resetTodos(); // Initialize todos

// ✅ Move middleware **after** app is defined
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        todos = resetTodos(); // Reset todos before each test
    }
    req.todos = todos;
    next();
});

// GET /todos
app.get('/todos', (req, res) => {
    res.json(req.todos); // ✅ Use req.todos to ensure consistency
});

// POST /todos
app.post('/todos', (req, res) => {
    const newTodo = { id: req.todos.length + 1, task: req.body.task };
    req.todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = req.todos.find(todo => todo.id === id);
    if (todo) {
        todo.task = req.body.task;
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = req.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        req.todos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

if (require.main === module) {
    const port = 9999;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

module.exports = app; // ✅ Ensure app is exported
