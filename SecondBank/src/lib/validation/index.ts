export function validateEmail(email: string): string {
    if (!email) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please provide a valid email address';
    }
    return '';
  }
  
  export function validatePassword(password: string): string {
    if (!password) {
      return 'Password is required';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    } else if (!/\W/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  }
  