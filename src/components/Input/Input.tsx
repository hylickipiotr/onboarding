import { twMerge } from 'tailwind-merge';
import { inputDefaultProps } from './Input.config';
import type { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({
  name,
  id,
  className,
  ...props
}) => {
  return (
    <input
      {...inputDefaultProps}
      name={name}
      id={id ?? name}
      className={twMerge(inputDefaultProps.className, className)}
      {...props}
    />
  );
};
