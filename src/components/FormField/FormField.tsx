import { Label, type LabelProps } from '../Label/Label';
import {
  getFormFieldDescriptionId,
  getFormFieldErrorMessageId,
  getFormFieldLabelId,
} from './FormField.helpers';
import {
  formFieldDescriptionClassName,
  formFieldErrorMessageClassName,
  formFieldLabelClassName,
} from './FormField.styles';

type FormFieldProps = React.JSX.IntrinsicElements['div'] & {
  label: React.ReactNode;
  name: string;
  children: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  labelProps?: LabelProps;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  children,
  description,
  error,
  labelProps,
  ...props
}) => {
  return (
    <div {...props}>
      <Label
        htmlFor={name}
        id={getFormFieldLabelId(name)}
        className={formFieldLabelClassName({ description: !!description })}
        {...labelProps}
      >
        {label}
      </Label>
      {description ? (
        <p
          id={getFormFieldDescriptionId(name)}
          className={formFieldDescriptionClassName}
        >
          {description}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={getFormFieldErrorMessageId(name)}
          className={formFieldErrorMessageClassName}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};
