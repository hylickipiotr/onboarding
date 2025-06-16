import { IconCheck, IconPointFilled } from '@tabler/icons-react';
import type React from 'react';

type PasswordRequirementProps = {
  label: string;
  valid: boolean;
  error: boolean;
};

export const PasswordRequirement: React.FC<PasswordRequirementProps> = ({
  label,
  valid,
  error,
}) => {
  const showError = !valid && error;

  const validIcon = <IconCheck size={20} className="text-emerald-600" />;
  const invalidIcon = (
    <IconPointFilled
      className={showError ? 'text-red-600' : 'text-gray-500'}
      size={10}
    />
  );

  return (
    <li
      className="flex items-center"
      aria-label={`Requirement ${valid ? 'met' : 'not met'}: ${label}`}
    >
      <div className="flex justify-center items-center w-5 h-5 ">
        {valid ? validIcon : invalidIcon}
      </div>
      <span
        className={`ml-1 text-sm ${
          showError ? 'text-red-600' : 'text-gray-500'
        }`}
      >
        {label}
      </span>
    </li>
  );
};
