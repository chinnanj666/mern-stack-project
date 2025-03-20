const request = require('supertest');
const app = require('../app');
let server;

beforeAll(() => {
    server = app.listen(9999);
});

afterAll((done) => {
    server.close(done);
});

describe('DELETE /todos/:id', () => {
    it('deletes an existing todo', async () => {
        const response = await request(app).delete('/todos/1');
        expect(response.status).toBe(204);
    });
});