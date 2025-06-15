import { twMerge } from 'tailwind-merge';
import { labelClassName } from './Label.styles';

export type LabelProps = React.JSX.IntrinsicElements['label'] & {
  htmlFor: string;
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label className={twMerge(labelClassName, className)} {...props}>
      {children}
    </label>
  );
};
