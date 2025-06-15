import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { useLoginDetails } from '../../../../contexts/AppContext';

type FormContainerProps = Omit<
  React.JSX.IntrinsicElements['form'],
  'defaultValue' | 'onSubmit'
> & {
  defaultValues?: LoginDetailsFormValues;
};

const LoginDetailsFormSchema = z.object({
  password: z.string().min(8),
  securityNumbers: z
    .array(z.string().regex(/^[0-9a-zA-Z]$/, 'Invalid character'))
    .length(6, 'Security number must have 6 digits')
    .refine((arr) => arr.every((val) => val.length === 1), {
      message: 'Each field must be filled',
    }),
  securityQuestions: z
    .object({
      question: z.string(),
      answer: z.string(),
    })
    .array()
    .length(3),
});

export type LoginDetailsFormValues = z.infer<typeof LoginDetailsFormSchema>;

export const FormContainer: React.FC<
  React.PropsWithChildren<FormContainerProps>
> = ({ defaultValues, children, ...props }) => {
  const navigate = useNavigate();
  const form = useForm<LoginDetailsFormValues>({
    defaultValues: getDefaultValues(defaultValues),
    resolver: zodResolver(LoginDetailsFormSchema),
    mode: 'onBlur',
  });
  const { setLoginDetails } = useLoginDetails();

  const onSubmit = (data: LoginDetailsFormValues) => {
    setLoginDetails({
      password: data.password,
      securityNumber: data.securityNumbers.join(''),
      securityQuestions: data.securityQuestions,
    });
    navigate('/login-details/confirmation');
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

const getDefaultValues = (values?: LoginDetailsFormValues) => {
  const defaultValues = {
    password: '',
    securityNumbers: [],
    securityQuestions: [],
  };

  return values ?? defaultValues;
};
