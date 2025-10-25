export const commentPaths = {
  '/api/v1/comments': {
    post: {
      tags: ['Comments'],
      summary: 'Yorum oluştur (v1)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CommentCreate' }
          }
        }
      },
      responses: {
        '201': {
          description: 'Yorum oluşturuldu',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CommentCreateResponse' }
            }
          }
        },
        '400': { description: 'Validasyon hatası' },
        '401': { description: 'Yetkisiz' },
        '404': { description: 'Parent bulunamadı' }
      }
    }
  },
  '/api/v1/comments/{id}': {
    put: {
      tags: ['Comments'],
      summary: 'Yorumu güncelle (v1)',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CommentUpdate' }
          }
        }
      },
      responses: {
        '200': {
          description: 'Yorum güncellendi',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CommentUpdateResponse' }
            }
          }
        },
        '403': { description: 'Sahip değil veya admin değil' },
        '404': { description: 'Yorum bulunamadı' },
        '400': { description: 'Geçersiz istek' }
      }
    },
    delete: {
      tags: ['Comments'],
      summary: 'Yorumu sil (v1)',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Yorum silindi',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/DeleteCommentResponse' }
            }
          }
        },
        '403': { description: 'Sahip değil veya admin değil' },
        '404': { description: 'Yorum bulunamadı' }
      }
    }
  },
  '/api/v1/blogs/{id}/comments': {
    get: {
      tags: ['Comments'],
      summary: 'Blog yorumlarını listele (v1)',
      description: 'Admin olmayan kullanıcılar yalnızca aktif yorumları görür.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Yorum listesi',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CommentsListResponse' }
            }
          }
        },
        '404': { description: 'Blog bulunamadı' },
        '400': { description: 'Geçersiz blog id' }
      }
    }
  },
  '/api/v1/news/{id}/comments': {
    get: {
      tags: ['Comments'],
      summary: 'Haber yorumlarını listele (v1)',
      description: 'Admin olmayan kullanıcılar yalnızca aktif yorumları görür.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        '200': {
          description: 'Yorum listesi',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CommentsListResponse' }
            }
          }
        },
        '404': { description: 'Haber bulunamadı' },
        '400': { description: 'Geçersiz haber id' }
      }
    }
  }
};

export const commentSchemas = {
  CommentPublic: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      content: { type: 'string' },
      author: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          profilePicture: { type: 'string' }
        }
      },
      subjectModel: { type: 'string', enum: ['Blog', 'News'] },
      subject: { type: 'string' },
      isActive: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  CommentCreate: {
    type: 'object',
    required: ['content', 'subjectModel', 'subject'],
    properties: {
      content: { type: 'string', minLength: 1, maxLength: 2000 },
      subjectModel: { type: 'string', enum: ['Blog', 'News'] },
      subject: { type: 'string' }
    }
  },
  CommentUpdate: {
    type: 'object',
    required: ['content'],
    properties: {
      content: { type: 'string', minLength: 1, maxLength: 2000 },
      isActive: { type: 'boolean', description: 'Sadece admin tarafından değiştirilebilir' }
    }
  },
  CommentsListResponse: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: { $ref: '#/components/schemas/CommentPublic' }
      }
    }
  },
  CommentCreateResponse: {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      item: { $ref: '#/components/schemas/CommentPublic' }
    }
  },
  CommentUpdateResponse: {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      item: { $ref: '#/components/schemas/CommentPublic' }
    }
  },
  DeleteCommentResponse: {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      id: { type: 'string' }
    }
  }
};