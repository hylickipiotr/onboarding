export type FormFieldDescriptionProps = React.JSX.IntrinsicElements['p'];

export type FormFieldProps = {
  children: React.ReactNode;
  description?: React.ReactNode;
  label: React.ReactNode;
  name: string;
};
