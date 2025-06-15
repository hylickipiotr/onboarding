import { cva } from "class-variance-authority";

export const inputBaseClassName =
  'block w-full rounded-md border border-gray-300 px-2.5 py-2 bg-white text-gray-900 hover:border-gray-400 hover:cursor-text focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-offset-0 focus:ring-blue-200 transition-colors';
export const inputClassName = cva(inputBaseClassName, {
  variants: {
    error: {
      true: 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-200',
      false: 'border-gray-300 text-gray-900',
    },
  },
  defaultVariants: {
    error: false,
  },
});
