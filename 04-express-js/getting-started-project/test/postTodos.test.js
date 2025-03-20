const request = require('supertest');
const app = require('../app');

let server;

beforeAll(() => {
    server = app.listen(9999);
});

afterAll((done) => {
    server.close(done);
});

describe.only('POST /todos', () => {
    it('adds a new todo and returns it', async () => {
        const newTodo = { task: 'Read a book' };

        const response = await request(app)
            .post('/todos')
            .send(newTodo)
            .set('Accept', 'application/json');

        console.log('Response:', response.body);

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty('id');

        expect(response.body.task).toBe(newTodo.task); // This checks the task in the response
    });
});
