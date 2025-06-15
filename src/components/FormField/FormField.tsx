import { Label, type LabelProps } from '../Label/Label';
import {
  getFormFieldDescriptionId,
  getFormFieldLabelId,
} from './FormField.helpers';
import {
  formFieldDescriptionClassName,
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
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
};
