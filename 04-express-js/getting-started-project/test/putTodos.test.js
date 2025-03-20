const request = require('supertest');
const app = require('../app');
let server;

beforeAll(() => {
    server = app.listen(9999);
});

afterAll((done) => {
    server.close(done);
});

describe('PUT /todos/:id', () => {
    it('updates an existing todo', async () => {
        const updatedTodo = { task: 'Buy groceries and cook dinner' };
        const response = await request(app).put('/todos/1').send(updatedTodo);
        expect(response.status).toBe(200);
        expect(response.body.task).toBe(updatedTodo.task);
    });
});