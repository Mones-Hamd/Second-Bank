
import React, { useState } from 'react'
import {  validateEmail, validatePassword } from "../../lib/validation"
import { Link, useNavigate } from "react-router-dom"
import { Form } from "../../components/ui/form"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { useFormState, useValidation } from '@/hooks/useForm'

import { useUserContext } from '@/context/AuthContext'
import { useSignInAccountMutation } from '@/lib/react-query/queriesAndMutations'
import ErrorAlert from '@/components/ui/ErrorAlret'
import Loading from '@/components/ui/Loading'

const SigninForm = () => {
  const { formData, handleChange } = useFormState();
  const { errors, debouncedValidateEmail, debouncedValidatePassword,setErrors } = useValidation();
  const [errorAlert, setErrorAlert] = useState<string>("");

  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  // Query
  const { mutateAsync: signInAccount } = useSignInAccountMutation();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
      const passwordError = validatePassword(formData.password);
      setErrors({
        email: emailError,
        password: passwordError,
      });

    if (!emailError && !passwordError) {
      // Proceed with form submission
    try{
      const session = await signInAccount(formData);
      const isLoggedIn = await checkAuthUser();
  
    if (isLoggedIn) navigate("/");
    }
    catch(err){
      setErrorAlert(err.message || "An error occurred")
    }
  }
}
  return (
        <div className="sm:w-420 flex-center max-w-md w-full space-y-2 flex-col mt-4">
             {errorAlert && <ErrorAlert error={errorAlert}/>}
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
                            onChange={(e)=>{handleChange(e);
                               debouncedValidateEmail(e.target.value);}
                            }
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
                            onChange={(e)=>{
                              handleChange(e);
                            debouncedValidatePassword}
                            }
                            error={errors.password}
                            success={!errors.password} 
                        />
                    </div>
                    <Button type="submit">
                    {isUserLoading ? <Loading />: "Sign In"}</Button>
          
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