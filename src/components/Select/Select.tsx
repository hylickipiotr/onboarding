import { selectDefaultProps } from './Select.config';
import type { SelectProps } from './Select.types';

export const Select: React.FC<SelectProps> = ({
  children,
  placeholder,
  ...props
}) => {
  return (
    <select {...selectDefaultProps} {...props}>
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  );
};
