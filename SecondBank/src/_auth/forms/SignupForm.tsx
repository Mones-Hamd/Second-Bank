import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Form } from "../../components/ui/form"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { validateEmail, validatePassword } from '../../lib/validation'
import { useFormState, useValidation } from '../../hooks/useForm';
import { useCreateAccountMutation, useSignInAccountMutation } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import ErrorAlert from '@/components/ui/ErrorAlret'
import Loading from '@/components/ui/Loading'

const SignupForm = () => {
    const { formData, handleChange } = useFormState();
    const { errors, 
      debouncedValidateEmail,
      debouncedValidatePassword,
      validateConfirmPassword, 
      setErrors } = useValidation();
    const [errorAlert, setErrorAlert] = useState<string>("");
    const navigate = useNavigate();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

    const {mutateAsync:createAccount, isPending : isCreatingAccount} =useCreateAccountMutation();
    const { mutateAsync: signInAccount, isPending : isSigningInUser } = useSignInAccountMutation();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const emailError = validateEmail(formData.email);
      const passwordError = validatePassword(formData.password);
      const confirmPasswordError =
        formData.password !== formData.confirmPassword ? 'Passwords do not match' : '';
  
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError
      });
      
      if (!emailError && !passwordError && !confirmPasswordError) {
        // Proceed with form submission
      try{
            const newUser = await createAccount(formData);
            const session = await signInAccount({
              email: formData.email,
              password: formData.password,
            });
      
            if (!session) {       
              navigate("/signin");
              
              return;
            }
      
            const isLoggedIn = await checkAuthUser();
      
            if (isLoggedIn)  navigate("/");
          } catch (err) {
            setErrorAlert(err.message || "An error occurred")
          }
        }
   
      }
  
    return (
      <div className="sm:w-420 flex-center max-w-md w-full space-y-2 flex-col mt-4">
        {errorAlert && <ErrorAlert error={errorAlert}/>}
        <h3 className="md:h4-bold pt-5 sm:pt-12"> Join Second Bank community </h3>
        <div className="flex justify-center w-full">
          <Form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">*Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email">*Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                  debouncedValidateEmail(e.target.value);
                }}
                error={errors.email} 
                success={!errors.email} 
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
                onChange={(e) => {
                  handleChange(e);
                  debouncedValidatePassword(e.target.value);
                }}
                error={errors.password} 
                success={!errors.password} 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="confirmPassword">*Confirm Password:</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                  validateConfirmPassword(e.target.value, formData.password);
                }}
                error={errors.confirmPassword} 
                success={!errors.confirmPassword} 
              />
            </div>
            <Button type="submit">{isCreatingAccount || isSigningInUser || isUserLoading? <Loading /> : "Sign up"}</Button>
            <p className="mt-2 text-sm text-gray-600 secondary-text">
              Already have an account?
              <Link
                to="/signin"
              >
                Sign in
              </Link>
            </p>
          </Form>
        </div>
      </div>
    );
  };
  
  export default SignupForm;