import { cva } from "class-variance-authority";

import { labelClassName } from "../Label/Label.styles";

export const formFieldDescriptionClassName = 'text-sm text-gray-500 mb-1';
export const formFieldErrorMessageClassName = 'mt-2 text-sm text-red-600';
export const formFieldLabelClassName = cva(labelClassName, {
  variants: {
    description: {
      true: 'mb-0',
      false: '',
    },
  },
});
