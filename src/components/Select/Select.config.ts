import { inputDefaultProps } from "../Input/Input.config";
import type { SelectProps } from "./Select.types";

export const selectDefaultProps = {
  className: inputDefaultProps.className,
  defaultValue: '',
} satisfies Partial<SelectProps>;
