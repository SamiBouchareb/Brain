import React from 'react';

interface BadgeProps {
  variant: 'success' | 'danger' | 'primary' | 'secondary';
  children: React.ReactNode;
}

const variants = {
  success: 'bg-green-100 text-green-700',
  danger: 'bg-red-100 text-red-700',
  primary: 'bg-indigo-100 text-indigo-700',
  secondary: 'bg-gray-100 text-gray-700',
};

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}