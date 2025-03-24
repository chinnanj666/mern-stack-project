const express = require('express');
const app = express();

// Load the port from the .env file (default to 3000 if not set)
const port = process.env.PORT || 3001;

app.use(express.json());

let todos = [
    { id: 1, task: 'Learn Express', completed: false },
    { id: 2, task: 'Build a Todo app', completed: false },
    { id: 3, task: 'Write documentation', completed: false },
    { id: 4, task: 'Prepare presentation', completed: true },
    { id: 5, task: 'Clean the house', completed: false },
    {id:6,task:"Buy Grocery for House",completed :true},
];

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

// GET: Retrieve all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET: Retrieve a single todo by id
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// POST: Create a new todo
app.post('/todos', (req, res) => {
    const { task, completed } = req.body;
    const newTodo = {
        id: todos.length + 1,
        task,
        completed: completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT:exsiting one
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    const { task, completed } = req.body;
    todo.task = task || todo.task;
    todo.completed = completed !== undefined ? completed : todo.completed;

    res.json(todo);
});

// PATCH:
app.patch('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    if (req.body.completed !== undefined) {
        todo.completed = req.body.completed;
    }

    res.json(todo);
});

// DELETE: Remove a todo by id
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Todo not found');

    todos.splice(index, 1);
    res.status(204).send(); // No content
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
