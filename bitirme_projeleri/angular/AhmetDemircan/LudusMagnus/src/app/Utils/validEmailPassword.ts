export class ValidationUtils {
  
  /**
   * Email format validation
   * @param email - Doğrulanacak email adresi
   * @returns boolean - Geçerli ise true, değilse false
   */
  static isValidEmail(email: string): boolean {
    if (!email || email.trim() === '') {
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }
  
  /**
   * Password strength validation
   * @param password - Doğrulanacak şifre
   * @returns object - Validation sonucu ve mesaj
   */
  static validatePassword(password: string): { isValid: boolean; message: string } {
    if (!password) {
      return { isValid: false, message: 'Looks like you left your password empty. While an empty password might be hard to brute-force, you still need to fill it in. 😉' };
    }
    
    if (password.length < 6) {
      return { isValid: false, message: 'We cannot allow you to have a password with only 6 characters, we are not in 1990 anymore.' };
    }
    
    if (password.length > 25) {
      return { isValid: false, message: 'We cannot allow you to have a password with more than 25 characters; in the end, we are the ones who pay for the servers. 💸' };
    }
    
    // Güçlü şifre kontrolü (opsiyonel)
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers) {
      return { isValid: true, message: 'Good job, password is strong.' };
    }
    
    return { isValid: true, message: 'Good job..., Really' };
  }
  
  /**
   * Password confirmation validation
   * @param password - Ana şifre
   * @param confirmPassword - Doğrulama şifresi
   * @returns boolean - Eşleşiyorsa true, değilse false
   */
  static passwordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }
  
  /**
   * Email domain validation (opsiyonel)
   * @param email - Doğrulanacak email
   * @param allowedDomains - İzin verilen domain listesi
   * @returns boolean - İzin verilen domain'de ise true
   */
  static isAllowedEmailDomain(email: string, allowedDomains: string[] = []): boolean {
    if (allowedDomains.length === 0) {
      return true; // Tüm domain'lere izin ver
    }
    
    const domain = email.split('@')[1]?.toLowerCase();
    return allowedDomains.some(allowedDomain => 
      domain === allowedDomain.toLowerCase()
    );
  }
  
  /**
   * Comprehensive form validation
   * @param formData - Form verileri
   * @returns object - Validation sonucu
   */
  static validateRegistrationForm(formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Do you belive that your name is more than 2 characters?');
    }
    
    // Email validation
    if (!this.isValidEmail(formData.email)) {
      errors.push('Do you belive that your email is valid?');
    }
    
    // Password validation
    const passwordValidation = this.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.push(passwordValidation.message);
    }
    
    // Password confirmation
    if (!this.passwordsMatch(formData.password, formData.confirmPassword)) {
      errors.push('Make copy paste your password do not match');
    }
    
    // Role validation
    if (!formData.role || !['student', 'teacher', 'admin (just kidding)'].includes(formData.role)) {
      errors.push('You must choose a valid role: such as student, teacher, admin just kidding 🤣');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}