import express from 'express';
import path from 'path';
import request from 'supertest';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler';

// Test için minimal bir app kur (view engine ve middleware sırası önemlidir)
function makeTestApp() {
  const app = express();
  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'src', 'views'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API tarafı için error injection rotaları
  app.get('/api/__test__/cast', (_req, _res, next) => {
    next(Object.assign(new Error('bad'), { name: 'CastError' }));
  });

  app.get('/api/__test__/validation', (_req, _res, next) => {
    next(Object.assign(new Error('validation'), {
      name: 'ValidationError',
      errors: { title: { message: 'Başlık zorunlu' }, content: { message: 'İçerik zorunlu' } }
    }));
  });

  app.get('/api/__test__/500', (_req, _res, next) => {
    next(new Error('Boom'));
  });

  // Web tarafı için error injection rotası
  app.get('/__test__/500', (_req, _res, next) => {
    next(new Error('Boom'));
  });

  // 404’leri en sonda yakala
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

describe('global errorHandler', () => {
  let app: express.Express;

  beforeEach(() => {
    app = makeTestApp();
  });

  test('API 404 -> JSON', async () => {
    const res = await request(app).get('/api/endpoint-yok');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('error', 'Endpoint bulunamadı');
  });

  test('Web 404 -> EJS (text/html)', async () => {
    const res = await request(app).get('/sayfa-yok');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain('404'); // 404 şablonundan bir iz
  });

  test('API CastError -> 400 JSON payload', async () => {
    const res = await request(app).get('/api/__test__/cast');
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toMatchObject({
      error: 'Geçersiz ID parametresi',
      code: 'CAST_ERROR'
    });
  });

  test('API ValidationError -> 400 JSON payload + details', async () => {
    const res = await request(app).get('/api/__test__/validation');
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('error', 'Validasyon hatası');
    expect(Array.isArray(res.body.details)).toBe(true);
    expect(res.body.details).toEqual(
      expect.arrayContaining(['Başlık zorunlu', 'İçerik zorunlu'])
    );
  });

  test('API 500 -> 500 JSON message', async () => {
    const res = await request(app).get('/api/__test__/500');
    expect(res.status).toBe(500);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('error', 'Boom');
  });

  test('Web 500 -> 500 EJS (title ve mesaj)', async () => {
    const res = await request(app).get('/__test__/500');
    expect(res.status).toBe(500);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain('Sunucu Hatası'); // 500.ejs başlığı
    expect(res.text).toContain('Boom');           // error message
  });
});