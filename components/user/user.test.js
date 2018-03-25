const test = require('ava')
const server = require('../../server')
const request = require('supertest')

test('Get Users', async t => {
  let res = await request(server)
    .get('/api/user/?username=emilioriosvz&location=barcelona&language=javascript')

  t.is(res.status, 200)
  t.is(res.body.success, true)
  t.true(res.body.response.length > 0)
})
