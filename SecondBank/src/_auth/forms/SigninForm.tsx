
import React, { useState } from 'react'
import {  validateEmail, validatePassword } from "../../lib/validation"
import { Link } from "react-router-dom"
import { Form } from "../../components/ui/form"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { debounce } from '../../lib/utils'

const SigninForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const [errors, setErrors] = useState({
        email: '',
        password: ''
      });
    
      const debouncedValidateEmail = debounce((value: string) => {
        const emailError = validateEmail(value);
        setErrors(prevErrors => ({
          ...prevErrors,
          email: emailError
        }));
      }, 500);
    
      const debouncedValidatePassword = debounce((value: string) => {
        const passwordError = validatePassword(value);
        setErrors(prevErrors => ({
          ...prevErrors,
          password: passwordError
        }));
      }, 500);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
    
        if (name === 'email') {
          debouncedValidateEmail(value);
        }
    
        if (name === 'password') {
          debouncedValidatePassword(value);
        }
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
    
        setErrors({
          email: emailError,
          password: passwordError
        });
    
        if (!emailError && !passwordError) {
          // Proceed with form submission
          console.log('Form submitted successfully');
        }
      };
  return (
        <div className="sm:w-420 flex-center max-w-md w-full space-y-2 flex-col mt-4">
            <h3 className=" md:h4-bold pt-5 sm:pt-12"> Login </h3>
            <div className="flex justify-center w-full">
                <Form onSubmit={handleSubmit}>
                  <p className="secondary-text text-center mt-2 mb-2">
                     Welcome back! Please enter your details. </p>
                    <div className="mb-4">
                        <Label htmlFor="email">*Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email} // Pass the error prop for email input
                            success={!errors.email} // Pass the success prop based on email validation
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">*Password:</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password} // Pass the error prop for password input
                            success={!errors.password} // Pass the success prop based on password validation
                        />
                    </div>
                    <Button type="submit">Sign In</Button>
          
                    <p className="secondary-text text-center mt-2">
                     Don&apos;t have an account?
                    <Link
                        to="/signup"
                        >
                        Sign up
                    </Link>
                     </p>
        
                </Form>
            </div>
        
           
        </div>

  
  )
}

export default SigninForm