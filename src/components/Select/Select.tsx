import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { selectClassName } from './Select.styles';

export type SelectProps = React.JSX.IntrinsicElements['select'] &
  VariantProps<typeof selectClassName> & {
    placeholder: string;
    name: string;
  };

export const Select: React.FC<SelectProps> = ({
  children,
  name,
  id,
  placeholder,
  className,
  error,
  value,
  defaultValue,
  ...props
}) => {
  return (
    <select
      name={name}
      id={id ?? name}
      className={twMerge(selectClassName({ error }), className)}
      value={value}
      defaultValue={value === undefined ? defaultValue ?? '' : undefined}
      aria-invalid={error ? 'true' : undefined}
      {...props}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  );
};
