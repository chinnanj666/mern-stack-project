const request = require('supertest');
const app = require('../app');

let server;

beforeAll(() => {
    server = app.listen(9999);
});

afterAll((done) => {
    server.close(done);
});

describe('GET /todos', () => {
    it('responds with JSON containing a list of todos', async () => {
        const response = await request(app).get('/todos');
        console.log('Response Body:', response.body); // Debugging
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, task: 'Buy groceries' },
            { id: 2, task: 'Walk the dog' }
        ]);
    });
});
