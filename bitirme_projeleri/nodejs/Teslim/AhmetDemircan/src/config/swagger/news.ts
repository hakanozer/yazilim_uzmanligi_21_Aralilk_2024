export const newsPaths = {
  // v1 endpoints
  '/api/v1/news': {
    get: {
      tags: ['News'],
      summary: 'Haberleri listele (v1)',
      responses: {
        '200': {
          description: 'Haber listesi',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/News' }
                  }
                }
              }
            }
          }
        },
        '500': { description: 'Haberler listelenemedi' }
      }
    },
    post: {
      tags: ['News'],
      summary: 'Yeni haber oluştur (v1)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/NewsCreate' }
          }
        }
      },
      responses: {
        '201': {
          description: 'Haber oluşturuldu',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ok: { type: 'boolean' },
                  item: { $ref: '#/components/schemas/News' }
                }
              }
            }
          }
        },
        '400': { description: 'Validasyon veya istek hatası' },
        '401': { description: 'Yetkisiz' }
      }
    }
  },
  '/api/v1/news/{id}': {
    get: {
      tags: ['News'],
      summary: 'Haber detayını getir (v1)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Haber bulundu',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { item: { $ref: '#/components/schemas/News' } }
              }
            }
          }
        },
        '404': { description: 'Haber bulunamadı' },
        '400': { description: 'Geçersiz haber id' }
      }
    },
    put: {
      tags: ['News'],
      summary: 'Haberi güncelle (v1)',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/NewsUpdate' }
          }
        }
      },
      responses: {
        '200': {
          description: 'Haber güncellendi',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ok: { type: 'boolean' },
                  item: { $ref: '#/components/schemas/News' }
                }
              }
            }
          }
        },
        '403': { description: 'Yetkisiz' },
        '404': { description: 'Haber bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    },
    delete: {
      tags: ['News'],
      summary: 'Haberi sil (v1)',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Haberi silindi',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { ok: { type: 'boolean' } }
              }
            }
          }
        },
        '403': { description: 'Yetkisiz' },
        '404': { description: 'Haber bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    }
  },
  '/api/v1/news/{id}/like': {
    post: {
      tags: ['News'],
      summary: 'Haberi beğen veya beğeniyi geri al (v1)',
      description: 'Aynı butona tekrar basılırsa beğeni geri alınır; opposite basılırsa dislike -> like dönüşür.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Reaksiyon sonucu',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ReactionResult' }
            }
          }
        },
        '401': { description: 'Yetkisiz' },
        '404': { description: 'Haber bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    }
  },
  '/api/v1/news/{id}/dislike': {
    post: {
      tags: ['News'],
      summary: 'Haberi beğenmeme veya geri alma (v1)',
      description: 'Aynı butona tekrar basılırsa beğenmeme geri alınır; opposite basılırsa like -> dislike dönüşür.',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Reaksiyon sonucu',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ReactionResult' }
            }
          }
        },
        '401': { description: 'Yetkisiz' },
        '404': { description: 'Haber bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    }
  },
  '/api/v1/search/news': {
    get: {
      tags: ['News'],
      summary: 'Haber araması (v1)',
      parameters: [
        { name: 'q', in: 'query', required: true, schema: { type: 'string' }, description: 'Arama terimi' },
        { name: 'limit', in: 'query', required: false, schema: { type: 'integer', minimum: 1, maximum: 50 }, description: 'Maksimum sonuç sayısı (varsayılan 20, en fazla 50)' }
      ],
      responses: {
        '200': {
          description: 'Arama sonuçları',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/News' }
                  }
                }
              }
            }
          }
        },
        '500': { description: 'Arama sırasında hata oluştu' }
      }
    },
  },
};

export const newsSchemas = {
  News: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      title: { type: 'string' },
      content: { type: 'string' },
      imageUrl: { type: 'string' },
      isActive: { type: 'boolean' },
      category: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' }
        }
      },
      author: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' }
        }
      },
      likesID: { type: 'array', items: { type: 'string' }, description: 'Beğenen kullanıcı id’leri' },
      dislikesID: { type: 'array', items: { type: 'string' }, description: 'Beğenmeyen kullanıcı id’leri' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  NewsCreate: {
    type: 'object',
    required: ['title', 'content', 'category'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      category: { type: 'string', description: 'Category ObjectId' },
      imageUrl: { type: 'string' },
      isActive: { type: 'boolean' }
    }
  },
  NewsUpdate: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      category: { type: 'string', description: 'Category ObjectId' },
      imageUrl: { type: 'string' },
      isActive: { type: 'boolean' }
    }
  },
  ReactionResult: {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      action: {
        type: 'string',
        enum: [
          'liked',
          'unliked',
          'switched_to_like',
          'disliked',
          'undisliked',
          'switched_to_dislike'
        ]
      },
      likesCount: { type: 'number' },
      dislikesCount: { type: 'number' }
    }
  }
};