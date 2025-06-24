import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { useLoginDetails } from '../../../../contexts/AppContext';
import { passwordChecks } from '../PasswordField/PasswordField';

type FormContainerProps = Omit<
  React.JSX.IntrinsicElements['form'],
  'defaultValue' | 'onSubmit'
> & {
  defaultValues?: LoginDetailsFormValues;
};

const LoginDetailsFormSchema = z.object({
  password: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      for (const check of passwordChecks) {
        if (!check.validate(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${check.label} not met`,
          });
        }
      }
    }),
  securityNumbers: z
    .array(z.string().regex(/^\d$/, 'Only numbers allowed'))
    .length(6, 'Security number must have 6 digits')
    .refine((arr) => arr.every((val) => val.length === 1), {
      message: 'Each field must be filled',
    }),
  securityQuestions: z
    .array(
      z.object({
        question: z.string({
          required_error: 'Please choose a question from the list',
        }),
        answer: z
          .string({
            required_error: 'Please enter an answer',
          })
          .trim(),
      })
    )
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

  return (
    <FormProvider {...form}>
      <form
        className="px-4 pt-6 pb-8"
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const getDefaultValues = (values?: LoginDetailsFormValues) => {
  const defaultValues = {
    password: '',
    securityNumbers: Array.from({ length: 6 }).map(() => ''),
    securityQuestions: [],
  };

  return values ?? defaultValues;
};
