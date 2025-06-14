import { twMerge } from 'tailwind-merge';
import { buttonDefaultProps } from './Button.config';
import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...buttonDefaultProps}
      {...props}
      className={twMerge(buttonDefaultProps.className, className)}
    >
      {children}
    </button>
  );
};
