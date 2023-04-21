import clsx from 'clsx';
import React from 'react';
import CopyButton from './CopyButton';

type Props = {
  className?: string;
  invalid?: boolean;
  copy?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(
  {
    className,
    name,
    copy,
    invalid,
    ...props
  }: Props,
) {
  return (
    <>
      <input
        name={name}
        className={clsx(
          'w-full py-4 border-2 in bg-slate-900 !border-none focus:!outline-none focus:ring-1 focus:ring-blue-500 rounded-md placeholder:font-medium p-5',
          invalid && 'ring-1 ring-red-500',
          className,
        )}
        {...props}
      />
      {copy && (
        <CopyButton value={props.value} />
      )}
    </>
  );
}
