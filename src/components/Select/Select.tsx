import { twMerge } from 'tailwind-merge';
import { selectDefaultProps } from './Select.config';
import type { SelectProps } from './Select.types';

export const Select: React.FC<SelectProps> = ({
  children,
  name,
  id,
  placeholder,
  className,
  ...props
}) => {
  return (
    <select
      {...selectDefaultProps}
      name={name}
      id={id ?? name}
      className={twMerge(selectDefaultProps.className, className)}
      {...props}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  );
};
