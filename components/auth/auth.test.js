const test = require('ava')
const server = require('../../server')
const request = require('supertest')

test('Login', async t => {
  // ensure to create the user emilioriosvz
  await request(server)
    .get('/api/user/?username=emilioriosvz&location=barcelona&language=javascript')

  let res = await request(server)
    .post('/api/auth/login')
    .send({username: 'emilioriosvz'})

  t.is(res.status, 200)
  t.is(res.body.success, true)
})
