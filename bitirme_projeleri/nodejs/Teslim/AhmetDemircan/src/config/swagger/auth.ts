export const authPaths = {
  // v1 Auth endpoints
  '/api/v1/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Kullanıcı kaydı (v1)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 8 },
                name: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Kayıt başarılı',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  email: { type: 'string' },
                  name: { type: 'string' },
                  roles: { type: 'array', items: { type: 'string', enum: ['user', 'admin'] } }
                }
              }
            }
          }
        },
        '400': { description: 'Validasyon hatası' },
        '409': { description: 'E-posta zaten kayıtlı' },
        '500': { description: 'Sunucu hatası' }
      }
    }
  },
  '/api/v1/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Kullanıcı girişi (v1)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string' }
              }
            },
            example: {
              email: 'admin@example.com',
              password: '12345678'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Giriş başarılı, JWT üretildi',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: { type: 'string' },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      email: { type: 'string' },
                      name: { type: 'string' },
                      roles: { type: 'array', items: { type: 'string', enum: ['user', 'admin'] } }
                    }
                  }
                }
              }
            }
          }
        },
        '400': { description: 'Eksik/geçersiz giriş verisi' },
        '401': { description: 'Kimlik doğrulama başarısız' },
        '500': { description: 'Sunucu hatası' }
      }
    }
  },
  '/api/v1/auth/profile': {
    get: {
      tags: ['Auth'],
      summary: 'Profil bilgisi (v1)',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Kullanıcı profili',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      email: { type: 'string' },
                      name: { type: 'string' },
                      roles: { type: 'array', items: { type: 'string', enum: ['user', 'admin'] } }
                    }
                  }
                }
              }
            }
          }
        },
        '401': { description: 'Yetkisiz: token gerekli' },
        '404': { description: 'Kullanıcı bulunamadı' }
      }
    }
  },
  '/api/v1/auth/refresh': {
    post: {
      tags: ['Auth'],
      summary: 'Token yenile (v1)',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Yeni access token üretildi',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { token: { type: 'string' } }
              }
            }
          }
        },
        '401': { description: 'Yetkisiz: token gerekli' },
        '404': { description: 'Kullanıcı bulunamadı' }
      }
    }
  },
  '/api/v1/auth/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Çıkış yap (v1)',
      description: 'Stateless JWT için istemci tokenı temizler; cookie kullanan istemci için token cookie’si sıfırlanır.',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Çıkış başarılı',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { ok: { type: 'boolean' }, message: { type: 'string' } }
              }
            }
          }
        },
        '401': { description: 'Yetkisiz: token gerekli' }
      }
    }
  },
  
};