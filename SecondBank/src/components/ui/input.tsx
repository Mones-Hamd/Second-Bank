import React, { InputHTMLAttributes, useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
  success?: boolean;
}

export const Input: React.FC<InputProps> = ({ id, error, success, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="relative">
    <input
      {...rest}
      id={id}
      type={rest.type === 'password' && showPassword ? 'text' : rest.type}
      className={`shadow appearance-none border ${
        error ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300'
      } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline secondary-text`}
    />
    {rest.type === 'password' && (
      <button
        type="button"
        onClick={toggleShowPassword}
        className={`absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ${error && 'top-[-20px]'}`}
      >
        {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
      </button>
    )}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
  );
};
