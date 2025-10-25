export const baseSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Yggdrasil API',
    version: '1.0.0',
    description: 'Auth, Blog ve News endpointleri için Swagger dokümantasyonu'
  },
  servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
  // Tag sırası UI’da görünümü etkiler
  tags: [
    { name: 'Auth', description: 'Kayıt ve giriş' },
    { name: 'Blogs', description: 'Blog CRUD' },
    { name: 'News', description: 'Haber CRUD ve reaksiyonlar' },
    { name: 'Categories', description: 'Kategori listeleme ve oluşturma' },
    { name: 'Profile', description: 'Profil bilgileri ve şifre işlemleri' },
    { name: 'Comments', description: 'Yorum oluşturma, listeleme, güncelleme ve silme' }
  ],
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {}
  }
};