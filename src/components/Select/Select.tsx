import { IconChevronDown, IconSelector } from '@tabler/icons-react';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { selectBaseClassName, selectClassName } from './Select.styles';

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
    <div className="relative flex flex-col">
      <select
        name={name}
        id={id ?? name}
        className={twMerge(
          selectClassName({ error }),
          selectBaseClassName,
          className
        )}
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
      <span>
        <IconSelector className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      </span>
    </div>
  );
};
