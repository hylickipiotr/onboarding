import { Label } from '../Label/Label';
import { formFieldDescriptionDefaultProps } from './FormField.config';
import {
  getFormFieldDescriptionId,
  getFormFieldLabelId,
} from './FormField.helpers';

type FormFieldProps = React.JSX.IntrinsicElements['div'] & {
  label: React.ReactNode;
  name: string;
  children: React.ReactNode;
  description?: React.ReactNode;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  children,
  description,
  ...props
}) => {
  return (
    <div {...props}>
      <Label htmlFor={name} id={getFormFieldLabelId(name)}>
        {label}
      </Label>
      {description ? (
        <p
          id={getFormFieldDescriptionId(name)}
          {...formFieldDescriptionDefaultProps}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
};
