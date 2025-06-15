import { twMerge } from 'tailwind-merge';
import { buttonClassName } from './Button.styles';

type ButtonProps = React.JSX.IntrinsicElements['button'] & {
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={twMerge(buttonClassName, className)}
      {...props}
    >
      {children}
    </button>
  );
};
