export const profilePaths = {
  '/api/v1/profile': {
    get: {
      tags: ['Profile'],
      summary: 'Mevcut kullanıcının profili (v1)',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Kullanıcı profili',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProfileResponse' }
            }
          }
        },
        '401': { description: 'Yetkisiz: token gerekli' },
        '404': { description: 'Kullanıcı bulunamadı' }
      }
    },
    put: {
      tags: ['Profile'],
      summary: 'Ad/e‑posta güncelle (v1)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ProfileUpdateRequest' }
          }
        }
      },
      responses: {
        '200': {
          description: 'Profil güncellendi',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateProfileResponse' }
            }
          }
        },
        '400': { description: 'Validasyon hatası' },
        '401': { description: 'Yetkisiz: token gerekli' },
        '409': { description: 'E‑posta zaten kayıtlı' }
      }
    },
    delete: {
      tags: ['Profile'],
      summary: 'Hesabı sil (v1)',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Hesap silindi',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/DeleteProfileResponse' }
            }
          }
        },
        '401': { description: 'Yetkisiz: token gerekli' },
        '404': { description: 'Kullanıcı bulunamadı' }
      }
    }
  },
  '/api/v1/profile/password': {
    post: {
      tags: ['Profile'],
      summary: 'Şifre değiştir (v1)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ProfileChangePasswordRequest' }
          }
        }
      },
      responses: {
        '200': {
          description: 'Şifre güncellendi',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ChangePasswordResponse' }
            }
          }
        },
        '400': { description: 'Validasyon hatası' },
        '401': { description: 'Yetkisiz: token gerekli' }
      }
    }
  },
  '/api/v1/profile/picture': {
    post: {
      tags: ['Profile'],
      summary: 'Profil fotoğrafı yükle (v1)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: { $ref: '#/components/schemas/AvatarUpload' }
          }
        }
      },
      responses: {
        '200': {
          description: 'Profil fotoğrafı güncellendi',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UploadAvatarResponse' }
            }
          }
        },
        '400': { description: 'Desteklenmeyen dosya tipi veya uzantı' },
        '401': { description: 'Yetkisiz: token gerekli' }
      }
    }
  }
};

export const profileSchemas = {
  UserPublic: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      roles: { type: 'array', items: { type: 'string', enum: ['user', 'author', 'admin'] } },
      profilePicture: { type: 'string' }
    }
  },
  UserSummary: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' }
    }
  },
  ProfileResponse: {
    type: 'object',
    properties: {
      user: { $ref: '#/components/schemas/UserPublic' }
    }
  },
  ProfileUpdateRequest: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2 },
      email: { type: 'string', format: 'email' }
    }
  },
  UpdateProfileResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      user: { $ref: '#/components/schemas/UserSummary' }
    }
  },
  ProfileChangePasswordRequest: {
    type: 'object',
    required: ['currentPassword', 'newPassword'],
    properties: {
      currentPassword: { type: 'string' },
      newPassword: { type: 'string', minLength: 8 }
    }
  },
  ChangePasswordResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' }
    }
  },
  AvatarUpload: {
    type: 'object',
    properties: {
      avatar: { type: 'string', format: 'binary' }
    }
  },
  UploadAvatarResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      profilePicture: { type: 'string' }
    }
  },
  DeleteProfileResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' }
    }
  }
};