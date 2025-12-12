import request from 'supertest';
import app from '../src/app';

describe('App', () => {
  it('should respond to health check', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Server is running');
  });

  it('should serve home page', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.text).toContain('Habercilik.com');
  });

  it('should handle 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/unknown-route')
      .expect(404);
  });
});
