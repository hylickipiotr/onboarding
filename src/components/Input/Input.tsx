import { type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { inputClassName } from './Input.styles';

type InputProps = React.JSX.IntrinsicElements['input'] &
  VariantProps<typeof inputClassName> & {
    name: string;
  };

export const Input: React.FC<InputProps> = ({
  ref,
  className,
  id,
  name,
  error,
  ...props
}) => {
  return (
    <input
      ref={ref}
      type="text"
      name={name}
      id={id ?? name}
      className={twMerge(inputClassName({ error }), className)}
      aria-invalid={error ? 'true' : undefined}
      {...props}
    />
  );
};
