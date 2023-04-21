/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  size,
  loading,
  onClick,
  children,
  type = 'button',
  ...props
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'bg-blue-500 transition-opacity duration-200 text-white w-72 font-bold py-4 rounded-md flex items-center justify-center gap-2',
        className,
        size === 'sm' && '!py-1',
        size === 'md' && '!py-2',
        size === 'lg' && '!py-4',
        { '!opacity-50 !cursor-not-allowed': loading || props.disabled },
      )}
      {...props}
    >
      {loading && (<Image className="animate-spin" src="/loader.svg" alt="Loading" width={20} height={20} />)}
      {children}
    </button>
  );
}
