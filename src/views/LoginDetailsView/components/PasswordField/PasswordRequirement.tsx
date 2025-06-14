import { IconCheck, IconPointFilled } from '@tabler/icons-react';
import type React from 'react';

type PasswordRequirementProps = {
  label: React.ReactNode;
  valid: boolean;
};

export const PasswordRequirement: React.FC<PasswordRequirementProps> = ({
  label,
  valid,
}) => {
  const checked = valid ? 'true' : 'false';
  const validIcon = <IconCheck size={20} className="text-emerald-600" />;
  const invalidIcon = <IconPointFilled size={10} />;

  return (
    <li aria-checked={checked} className="flex items-center">
      <span className="flex justify-center items-center w-5 h-5">
        {valid ? validIcon : invalidIcon}
      </span>
      <span className="ml-2">{label}</span>
    </li>
  );
};
