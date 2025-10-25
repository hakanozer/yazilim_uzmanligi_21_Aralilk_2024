import User, { UserRole } from '../models/userModel';


// Default yönetici bilgileri (çevresel değişkenlerden veya güvenli bir yerden alınmalıdır)
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '12345678';
const DEFAULT_ADMIN_ROLE: UserRole = 'admin';

async function initializeAdmin() {
    try {
        // 1. Herhangi bir kullanıcı var mı kontrol et
        const userCount = await User.countDocuments(); 

        if (userCount === 0) {
            console.log('Veritabanında hiç kullanıcı bulunamadı. Varsayılan yönetici oluşturuluyor...');
            
            const adminUser = new User({
                email: DEFAULT_ADMIN_EMAIL,
                password: DEFAULT_ADMIN_PASSWORD,
                roles: [DEFAULT_ADMIN_ROLE]
            });

            await adminUser.save();
            
            console.log(`Varsayılan yönetici başarıyla oluşturuldu: ${DEFAULT_ADMIN_EMAIL}`);
        } else {
            // Eğer default admin e-posta ile bir kullanıcı varsa ve admin değilse admin rolünü ekle
            const adminCandidate = await User.findOne({ email: DEFAULT_ADMIN_EMAIL });
            if (adminCandidate && !(Array.isArray(adminCandidate.roles) && adminCandidate.roles.includes('admin'))) {
                adminCandidate.roles = Array.from(new Set([...(adminCandidate.roles || []), 'admin']));
                await adminCandidate.save();
                console.log(`Varsayılan yönetici rolü güncellendi: ${DEFAULT_ADMIN_EMAIL}`);
            } else {
                console.log('Veritabanında en az bir kullanıcı bulundu. (atama iptal edildi).');
            }
        }
    } catch (error) {
        console.error('Yönetici başlatılırken bir hata oluştu:', error);
        // process.exit(1);
    }
}

module.exports = initializeAdmin;