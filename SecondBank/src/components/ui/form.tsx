import React,{FormHTMLAttributes} from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<FormProps> = ({ onSubmit, children, ...rest }) => {
  return (
    <form onSubmit={onSubmit} {...rest} className="w-full max-w-sm">
      {children}
    </form>
  );
};