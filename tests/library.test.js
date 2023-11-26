const request = require('supertest');
const baseURL = 'localhost:3000';
const uuidv4 = require('uuid').v4;

describe('test apis', () => {
  const newUser = {
    name: `test_user_${uuidv4()}`,
  };
  const newBook = {
    name: `test_book_${uuidv4()}`,
  };

  beforeAll(() => {
  });

  it('(POST /users) new user creation should return 201', async () => {
    const response = await request(baseURL).post('/users').send(newUser);
    newUser.id = response.body.id;
    expect(response.statusCode).toBe(201);
  });

  it('(GET /users) should return 200', async () => {
    const response = await request(baseURL).get('/users');
    expect(response.statusCode).toBe(200);
  });

  it('(GET /users/:id) should return user', async () => {
    const response = await request(baseURL).get(`/users/1`);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Esin Öner');
    expect(response.statusCode).toBe(200);
  });

  it('(POST /books) new book creation should return 201', async () => {
    const response = await request(baseURL).post('/books').send(newBook);
    newBook.id = response.body.id;
    expect(response.statusCode).toBe(201);
  });

  it('(GET /books) should return 200', async () => {
    const response = await request(baseURL).get('/books');
    expect(response.statusCode).toBe(200);
  });

  it('(GET /books/:id) should return book properties', async () => {
    const response = await request(baseURL).get(`/books/1`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Neuromancer');
    // expect(response.body.score).toBe(-1);
  });

  // eslint-disable-next-line max-len
  it('(POST /users/:userId/borrow/:bookId) could not borrow a book', async () => {
    // eslint-disable-next-line max-len
    const response = await request(baseURL).post(`/users/1/borrow/1`);
    expect(response.statusCode).toBe(400);
  });

  it('(POST /users/:userId/return/:bookId) cant return this book', async () => {
    // eslint-disable-next-line max-len
    const response = await request(baseURL).post(`/users/1/return/1`).send({score: 5});
    expect(response.statusCode).toBe(404);
  });

  it('(GET /books/:id) should return book properties', async () => {
    const response = await request(baseURL).get(`/books/1`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Neuromancer');
  });
});
