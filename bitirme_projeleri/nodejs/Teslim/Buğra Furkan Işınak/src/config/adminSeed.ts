import { User } from '../models/User';
import { Category } from '../models/Category';

export const createAdminUser = async (): Promise<void> => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ roles: 'admin' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create admin user
    const adminData = {
      email: process.env.ADMIN_EMAIL || 'admin@bfitalks.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      roles: ['admin'] as const,
      isActive: true
    };

    const admin = new User(adminData);
    await admin.save();

    console.log('✅ Admin user created successfully');
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}`);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

export const createDefaultCategories = async (): Promise<void> => {
  try {
    const categories = [
      { name: 'Teknoloji', description: 'Teknoloji haberleri ve gelişmeleri', color: '#007bff', icon: 'fas fa-microchip' },
      { name: 'Spor', description: 'Spor haberleri ve sonuçları', color: '#28a745', icon: 'fas fa-futbol' },
      { name: 'Ekonomi', description: 'Ekonomi ve finans haberleri', color: '#ffc107', icon: 'fas fa-chart-line' },
      { name: 'Sağlık', description: 'Sağlık ve tıp haberleri', color: '#dc3545', icon: 'fas fa-heartbeat' },
      { name: 'Eğitim', description: 'Eğitim ve öğretim haberleri', color: '#6f42c1', icon: 'fas fa-graduation-cap' },
      { name: 'Kültür', description: 'Kültür ve sanat haberleri', color: '#fd7e14', icon: 'fas fa-palette' },
      { name: 'Politika', description: 'Politika ve siyaset haberleri', color: '#20c997', icon: 'fas fa-landmark' },
      { name: 'Dünya', description: 'Dünya haberleri', color: '#6c757d', icon: 'fas fa-globe' }
    ];

    for (const categoryData of categories) {
      const existingCategory = await Category.findOne({ name: categoryData.name });
      if (!existingCategory) {
        const category = new Category(categoryData);
        await category.save();
        console.log(`✅ Category created: ${categoryData.name}`);
      }
    }

    console.log('✅ Default categories created successfully');
  } catch (error) {
    console.error('❌ Error creating default categories:', error);
  }
};

// Initialize default data
export const initializeDefaultData = async (): Promise<void> => {
  await createAdminUser();
  await createDefaultCategories();
};
