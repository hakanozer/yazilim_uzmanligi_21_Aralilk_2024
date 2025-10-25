export const blogPaths = {
  // v1 endpoints
  '/api/v1/blogs': {
    get: {
      tags: ['Blogs'],
      summary: 'Blogları listele (v1)',
      responses: {
        '200': {
          description: 'Blog listesi',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Blog' }
                  }
                }
              }
            }
          }
        },
        '500': { description: 'Bloglar listelenemedi' }
      }
    },
    post: {
      tags: ['Blogs'],
      summary: 'Yeni blog oluştur (v1)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/BlogCreate' },
            example: {
              title: 'Where does it come from?',
              content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. It comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" by Cicero. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from section 1.10.32.',
              tags: ['lorem', 'ipsum'],
              categories: ['64f0e9a9c5a0f51b3a7f2d10'],
              coverImageUrl: 'https://example.com/cover.jpg',
              isPublished: true
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Blog oluşturuldu',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ok: { type: 'boolean' },
                  item: { $ref: '#/components/schemas/Blog' }
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
  '/api/v1/blogs/{id}': {
    get: {
      tags: ['Blogs'],
      summary: 'Blog detayını getir (v1)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Blog bulundu',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { item: { $ref: '#/components/schemas/Blog' } }
              }
            }
          }
        },
        '404': { description: 'Blog bulunamadı' },
        '400': { description: 'Geçersiz blog id' }
      }
    },
    put: {
      tags: ['Blogs'],
      summary: 'Blogu güncelle (v1)',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/BlogUpdate' },
            example: {
              title: 'Where does it come from?',
              content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. It comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" by Cicero. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from section 1.10.32.',
              tags: ['lorem', 'ipsum'],
              categories: ['64f0e9a9c5a0f51b3a7f2d10'],
              coverImageUrl: 'https://example.com/cover.jpg',
              isPublished: true
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Blog güncellendi',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ok: { type: 'boolean' },
                  item: { $ref: '#/components/schemas/Blog' }
                }
              }
            }
          }
        },
        '403': { description: 'Yetkisiz' },
        '404': { description: 'Blog bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    },
    delete: {
      tags: ['Blogs'],
      summary: 'Blogu sil (v1)',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Blog silindi',
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
        '404': { description: 'Blog bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    }
  },
  '/api/v1/blogs/{id}/like': {
    post: {
      tags: ['Blogs'],
      summary: 'Blogu beğen veya beğeniyi geri al (v1)',
      description: 'Aynı butona tekrar basılırsa beğeni geri alınır; tersine basılırsa dislike -> like dönüşür.',
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
        '404': { description: 'Blog bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    }
  },
  '/api/v1/blogs/{id}/dislike': {
    post: {
      tags: ['Blogs'],
      summary: 'Blogu beğenmeme veya geri alma (v1)',
      description: 'Aynı butona tekrar basılırsa beğenmeme geri alınır; tersine basılırsa like -> dislike dönüşür.',
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
        '404': { description: 'Blog bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    }
  },
  '/api/v1/search/blogs': {
    get: {
      tags: ['Blogs'],
      summary: 'Blog araması (v1)',
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
                    items: { $ref: '#/components/schemas/Blog' }
                  }
                }
              }
            }
          }
        },
        '500': { description: 'Arama sırasında hata oluştu' }
      }
    }
  }
};

export const blogSchemas = {
  Blog: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      title: { type: 'string' },
      content: { type: 'string' },
      tags: { type: 'array', items: { type: 'string' } },
      categories: { type: 'array', items: { type: 'string' } },
      coverImageUrl: { type: 'string' },
      isPublished: { type: 'boolean' },
      author: { type: 'string', description: 'Kullanıcı id' },
      likesID: { type: 'array', items: { type: 'string' }, description: 'Beğenen kullanıcı id’leri' },
      dislikesID: { type: 'array', items: { type: 'string' }, description: 'Beğenmeyen kullanıcı id’leri' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  BlogCreate: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      tags: { type: 'array', items: { type: 'string' } },
      categories: { type: 'array', items: { type: 'string' } },
      coverImageUrl: { type: 'string' },
      isPublished: { type: 'boolean' }
    }
  },
  BlogUpdate: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      tags: { type: 'array', items: { type: 'string' } },
      categories: { type: 'array', items: { type: 'string' } },
      coverImageUrl: { type: 'string' },
      isPublished: { type: 'boolean' }
    }
  }
};