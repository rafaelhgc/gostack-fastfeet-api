/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/App';

import truncate from '../utils/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to create admin', async () => {
    const user = await factory.create('User');
    expect(user).toHaveProperty('id');
  });

  it('Should be able to auth admin', async () => {
    await factory.create('User', {
      email: 'admin@fastfeet.com.br',
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({ email: 'admin@fastfeet.com.br', password: '123456' });

    expect(response.body).toHaveProperty('token');
  });
});
