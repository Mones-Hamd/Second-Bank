import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="block text-gray-900 text-xs  mb-2">
      {children}
    </label>
  );
};
