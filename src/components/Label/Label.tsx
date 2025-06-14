import { labelDefaultProps } from './Label.config';
import type { LabelProps } from './Label.types';

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label {...labelDefaultProps} {...props}>
      {children}
    </label>
  );
};
