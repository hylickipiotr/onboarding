import { inputDefaultProps } from './Input.config';
import type { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return <input {...inputDefaultProps} {...props} />;
};
