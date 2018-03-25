const test = require('ava')
const server = require('../../server')
const request = require('supertest')

test('Create Post', async t => {
  await request(server)
    .get('/api/user/?username=emilioriosvz&location=barcelona&language=javascript')

  let login = await request(server)
    .post('/api/auth/login')
    .send({ 'username': 'emilioriosvz' })

  login = login.body.response

  let res = await request(server)
    .post(`/api/post?token=${login}`)
    .send({
      'title': 'Javascript, the good parts',
      'body': 'Lorem Ipsum Dolor Sit Amet',
      'deactivated': false,
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg',
      'taggedUsers': []
    })

  t.is(res.status, 200)
  t.is(res.body.success, true)
  t.is(res.body.response.title, 'Javascript, the good parts')
})

test("Get the authenticated user's post", async t => {
  let login = await request(server)
    .post('/api/auth/login')
    .send({ 'username': 'emilioriosvz' })

  login = login.body.response

  // create one post
  await request(server)
    .post(`/api/post?token=${login}`)
    .send({
      'title': 'Javascript, the good parts',
      'body': 'Lorem Ipsum Dolor Sit Amet',
      'deactivated': false,
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg',
      'taggedUsers': []
    })

  // get the list
  let res = await request(server)
    .get(`/api/post?token=${login}`)

  t.is(res.status, 200)
  t.is(res.body.success, true)
  t.is(res.body.response.length > 0, true)
})

test('Get Post by tagged user', async t => {
  let users = await request(server)
    .get('/api/user/?username=emilioriosvz&location=barcelona&language=javascript')

  let userId = users.body.response[0]._id

  let login = await request(server)
    .post('/api/auth/login')
    .send({ 'username': 'emilioriosvz' })

  login = login.body.response

  // create one post
  await request(server)
    .post(`/api/post?token=${login}`)
    .send({
      'title': 'Javascript, the good parts',
      'body': 'Lorem Ipsum Dolor Sit Amet',
      'deactivated': false,
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg',
      'taggedUsers': [userId]
    })

  // get the list
  let res = await request(server)
    .get(`/api/post/${userId}/taggedUser`)

  t.is(res.status, 200)
  t.is(res.body.success, true)
  t.is(res.body.response.length > 0, true)
})

test('Deactivate Post', async t => {
  let users = await request(server)
    .get('/api/user/?username=emilioriosvz&location=barcelona&language=javascript')

  let userId = users.body.response[0]._id

  let login = await request(server)
    .post('/api/auth/login')
    .send({ 'username': 'emilioriosvz' })

  login = login.body.response

  // create one post
  let post = await request(server)
    .post(`/api/post?token=${login}`)
    .send({
      'title': 'Javascript, the good parts',
      'body': 'Lorem Ipsum Dolor Sit Amet',
      'deactivated': false,
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg',
      'taggedUsers': [userId]
    })

  // get the list
  let res = await request(server)
    .put(`/api/post/${post.body.response._id}/deactivate`)

  t.is(res.status, 200)
  t.is(res.body.success, true)
  t.true(res.body.response.deactivated)
})

test('Activate Post', async t => {
  let users = await request(server)
    .get('/api/user/?username=emilioriosvz&location=barcelona&language=javascript')

  let userId = users.body.response[0]._id

  // get the token
  let login = await request(server)
    .post('/api/auth/login')
    .send({ 'username': 'emilioriosvz' })

  login = login.body.response

  // create one post
  let post = await request(server)
    .post(`/api/post?token=${login}`)
    .send({
      'title': 'Javascript, the good parts',
      'body': 'Lorem Ipsum Dolor Sit Amet',
      'deactivated': false,
      'picture': 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg',
      'taggedUsers': [userId]
    })

  // get the list
  let res = await request(server)
    .put(`/api/post/${post.body.response._id}/activate`)

  t.is(res.status, 200)
  t.is(res.body.success, true)
  t.false(res.body.response.deactivated)
})
