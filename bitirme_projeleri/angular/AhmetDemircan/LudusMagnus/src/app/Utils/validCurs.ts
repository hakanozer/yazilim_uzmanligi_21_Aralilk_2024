import { ICourses, CursusLevel, CATEGORY_OPTIONS } from '../models/Icourses';

export class ValidCurs {
    // Kurs başlığı validasyonu
    static validateTitle(title: string): { isValid: boolean; message: string } {
        if (!title) {
            return { isValid: false, message: 'Curs title is required.' };
        }
        if (title.length < 3) {
            return { isValid: false, message: 'Curs title must be at least 3 characters long.' };
        }
        if (title.length > 100) {
            return { isValid: false, message: 'Curs title must be at most 100 characters long.' };
        }
        return { isValid: true, message: 'Curs title is valid.' };
    }

    // Kurs açıklaması validasyonu
    static validateDescription(description: string): { isValid: boolean; message: string } {
        if (!description) {
            return { isValid: false, message: 'Curs description is required.' };
        }
        if (description.length < 10) {
            return { isValid: false, message: 'Curs description must be at least 10 characters long.' };
        }
        if (description.length > 500) {
            return { isValid: false, message: 'Curs description must be at most 500 characters long.' };
        }
        return { isValid: true, message: 'Curs description is valid.' };
    }

    // Kurs süresi validasyonu
    static validateDuration(duration: string): { isValid: boolean; message: string } {
        if (!duration) {
            return { isValid: false, message: 'Curs duration is required.' };
        }
        if (duration.length < 2) {
            return { isValid: false, message: 'Curs duration must be at least 2 characters long.' };
        }
        if (duration.length > 50) {
            return { isValid: false, message: 'Curs duration must be at most 50 characters long.' };
        }
        return { isValid: true, message: 'Curs duration is valid.' };
    }

    // Kurs seviyesi validasyonu
    static validateLevel(level: string): { isValid: boolean; message: string } {
        const validLevels = Object.values(CursusLevel);
        if (!level) {
            return { isValid: false, message: 'Curs level is required.' };
        }
        if (!validLevels.includes(level as CursusLevel)) {
            return { isValid: false, message: `Curs level must be one of the following: ${validLevels.join(', ')}.` };
        }
        return { isValid: true, message: 'Curs level is valid.' };
    }

    // Eğitmen validasyonu
    static validateInstructor(instructor: string): { isValid: boolean; message: string } {
        if (!instructor) {
            return { isValid: false, message: 'Curs instructor is required.' };
        }
        if (instructor.length < 2) {
            return { isValid: false, message: 'Curs instructor must be at least 2 characters long.' };
        }
        if (instructor.length > 50) {
            return { isValid: false, message: 'Curs instructor must be at most 50 characters long.' };
        }
        // Sadece harf, boşluk ve nokta içermeli
        const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s\.]+$/;
        if (!nameRegex.test(instructor)) {
            return { isValid: false, message: 'Curs instructor must contain only letters, spaces, and dots.' };
        }
        return { isValid: true, message: 'Curs instructor is valid.' };
    }

    // Fiyat validasyonu
    static validatePrice(price: number): { isValid: boolean; message: string } {
        if (price === null || price === undefined) {
            return { isValid: false, message: 'Curs price is required.' };
        }
        if (price < 0) {
            return { isValid: false, message: 'Curs price must be positive.' };
        }
        if (price > 10000) {
            return { isValid: false, message: 'Curs price must be at most 10000.' };
        }
        return { isValid: true, message: 'Curs price is valid.' };
    }

    // Kurs kategorisi validasyonu - String array kullanarak
    static validateCategory(category: string): { isValid: boolean; message: string } {
        if (!category) {
            return { isValid: false, message: 'Curs category is required.' };
        }
        if (!CATEGORY_OPTIONS.includes(category)) {
            return { isValid: false, message: `Curs category must be one of the following: ${CATEGORY_OPTIONS.join(', ')}.` };
        }
        return { isValid: true, message: 'Curs category is valid.' };
    }

    // Kayıtlı öğrenci sayısı validasyonu
    static validateEnrolledStudents(enrolledStudents: number): { isValid: boolean; message: string } {
        if (enrolledStudents === null || enrolledStudents === undefined) {
            return { isValid: false, message: 'Enrolled students count is required.' };
        }
        if (enrolledStudents < 0) {
            return { isValid: false, message: 'Enrolled students count must be positive.' };
        }
        if (enrolledStudents > 10000) {
            return { isValid: false, message: 'Enrolled students count must be at most 10000.' };
        }
        return { isValid: true, message: 'Enrolled students count is valid.' };
    }

    // Oluşturulma tarihi validasyonu
    static validateCreatedAt(createdAt: string): { isValid: boolean; message: string } {
        if (!createdAt) {
            return { isValid: false, message: 'Created date is required.' };
        }
        const date = new Date(createdAt);
        if (isNaN(date.getTime())) {
            return { isValid: false, message: 'Created date must be a valid date.' };
        }
        return { isValid: true, message: 'Created date is valid.' };
    }

    // Tüm kurs verilerini validate eden ana metod
    static validateCursus(cursus: Partial<ICourses>): { isValid: boolean; messages: string[] } {
        const messages: string[] = [];
        let isValid = true;

        // Her alanı validate et
        if (cursus.title !== undefined) {
            const titleValidation = this.validateTitle(cursus.title);
            if (!titleValidation.isValid) {
                messages.push(titleValidation.message);
                isValid = false;
            }
        }

        if (cursus.description !== undefined) {
            const descValidation = this.validateDescription(cursus.description);
            if (!descValidation.isValid) {
                messages.push(descValidation.message);
                isValid = false;
            }
        }

        if (cursus.duration !== undefined) {
            const durationValidation = this.validateDuration(cursus.duration);
            if (!durationValidation.isValid) {
                messages.push(durationValidation.message);
                isValid = false;
            }
        }

        if (cursus.level !== undefined) {
            const levelValidation = this.validateLevel(cursus.level);
            if (!levelValidation.isValid) {
                messages.push(levelValidation.message);
                isValid = false;
            }
        }

        if (cursus.instructor !== undefined) {
            const instructorValidation = this.validateInstructor(cursus.instructor);
            if (!instructorValidation.isValid) {
                messages.push(instructorValidation.message);
                isValid = false;
            }
        }

        if (cursus.price !== undefined) {
            const priceValidation = this.validatePrice(cursus.price);
            if (!priceValidation.isValid) {
                messages.push(priceValidation.message);
                isValid = false;
            }
        }

        if (cursus.category !== undefined) {
            const categoryValidation = this.validateCategory(cursus.category);
            if (!categoryValidation.isValid) {
                messages.push(categoryValidation.message);
                isValid = false;
            }
        }
        return { isValid, messages };
    }

    // Geriye uyumluluk için eski metod
    validateCursusName(name: string): boolean {
        if (!name) return false;
        if (name.length < 3) return false;
        if (name.length > 20) return false;
        return true;
    }
}