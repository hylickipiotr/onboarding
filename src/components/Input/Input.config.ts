import type { InputProps } from "./Input.types";

export const inputDefaultProps = {
  type: 'text',
  className:
    'mt-1 block w-full rounded-md border border-gray-300 px-2.5 py-2 bg-white text-gray-900 hover:border-gray-400 hover:cursor-text focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-offset-0 focus:ring-blue-200 transition-colors',
} satisfies Partial<InputProps>;
