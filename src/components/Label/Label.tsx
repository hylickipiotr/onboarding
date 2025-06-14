import { twMerge } from 'tailwind-merge';
import { labelDefaultProps } from './Label.config';
import type { LabelProps } from './Label.types';

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label
      {...labelDefaultProps}
      className={twMerge(labelDefaultProps.className, className)}
      {...props}
    >
      {children}
    </label>
  );
};
