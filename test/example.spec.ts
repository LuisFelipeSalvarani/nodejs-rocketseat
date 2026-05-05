import { afterAll, beforeAll, test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'

beforeAll(async () => {
  await app.ready()
})

afterAll(() => {
  app.close()
})

test('user can create a new transaction', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'new transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})
