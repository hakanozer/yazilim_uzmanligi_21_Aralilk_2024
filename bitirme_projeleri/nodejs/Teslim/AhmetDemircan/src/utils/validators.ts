export function isValidEmail(email: string): boolean {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 8;
}

export function makeSafeRegex(input: string, flags: string = 'i'): RegExp {
  const escaped = String(input).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, flags);
}