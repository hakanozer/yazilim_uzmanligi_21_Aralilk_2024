export const categoryPaths = {
  '/api/v1/categories': {
    get: {
      tags: ['Categories'],
      summary: 'Kategorileri listele (v1)',
      responses: {
        '200': {
          description: 'Kategori listesi',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Category' }
                  }
                }
              }
            }
          }
        },
        '500': { description: 'Kategoriler listelenemedi' }
      }
    },
    post: {
      tags: ['Categories'],
      summary: 'Yeni kategori oluştur (v1)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CategoryCreate' }
          }
        }
      },
      responses: {
        '201': {
          description: 'Kategori oluşturuldu',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ok: { type: 'boolean' },
                  item: { $ref: '#/components/schemas/Category' }
                }
              }
            }
          }
        },
        '400': { description: 'Validasyon veya istek hatası' },
        '401': { description: 'Yetkisiz' },
        '403': { description: 'Admin yetkisi gerekli' }
      }
    }
  },
  '/api/v1/categories/{id}': {
    get: {
      tags: ['Categories'],
      summary: 'Kategori detayını getir (v1)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Kategori bulundu',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { item: { $ref: '#/components/schemas/Category' } }
              }
            }
          }
        },
        '404': { description: 'Kategori bulunamadı' },
        '400': { description: 'Geçersiz kategori id' }
      }
    }
  }
};

export const categorySchemas = {
  Category: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      kind: { type: 'string', enum: ['news', 'blog', 'both'] },
      isActive: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  CategoryCreate: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      kind: { type: 'string', enum: ['news', 'blog', 'both'] },
      isActive: { type: 'boolean' }
    }
  }
};