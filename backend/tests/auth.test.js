process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../src/app');
const { sequelize, User } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth flows', () => {
  test('register, login, access protected route', async () => {
    const email = 'test@example.com';
    const password = 'pass1234';
    const reg = await request(app).post('/api/v1/auth/register').send({ email, password });
    expect(reg.status).toBe(201);

    const login = await request(app).post('/api/v1/auth/login').send({ email, password });
    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty('accessToken');
    const token = login.body.accessToken;

    const createTask = await request(app).post('/api/v1/tasks').set('Authorization', `Bearer ${token}`).send({ title: 'T1' });
    expect(createTask.status).toBe(201);
  });
});
