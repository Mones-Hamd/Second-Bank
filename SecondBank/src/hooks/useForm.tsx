import { useState } from 'react';
import { debounce } from '../lib/utils';
import { validateEmail, validatePassword } from '../lib/validation';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email: string;
  password: string;
  confirmPassword: string;
}

export const useFormState = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return {
    formData,
    handleChange
  };
};

export const useValidation = () => {
  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const debouncedValidateEmail = debounce((value: string) => {
    const emailError = validateEmail(value);
    setErrors(prevErrors => ({
      ...prevErrors,
      email: emailError
    }));
  }, 2000);

  const debouncedValidatePassword = debounce((value: string) => {
    const passwordError = validatePassword(value);
    setErrors(prevErrors => ({
      ...prevErrors,
      password: passwordError
    }));
  }, 2000);

  const validateConfirmPassword = (value: string, password: string) => {
    const confirmPasswordError =
      password !== value ? 'Passwords do not match' : '';
    setErrors(prevErrors => ({
      ...prevErrors,
      confirmPassword: confirmPasswordError
    }));
  };

  return {
    errors,
    setErrors,
    debouncedValidateEmail,
    debouncedValidatePassword,
    validateConfirmPassword
  };
};
