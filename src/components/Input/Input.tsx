import { inputDefaultProps } from './Input.config';
import type { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({ name, id, ...props }) => {
  return (
    <input {...inputDefaultProps} name={name} id={id ?? name} {...props} />
  );
};
