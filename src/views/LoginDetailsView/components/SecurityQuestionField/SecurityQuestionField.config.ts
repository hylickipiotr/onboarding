import type { Option } from "./SecurityQuestionField.types";

export const SECURITY_QUESTION_OPTIONS = [
  {
    value: 'maiden-name',
    label: "What is your mother's maiden name?",
  },
  {
    value: 'city-of-birth',
    label: 'In what city were you born?',
  },
  {
    value: 'first-pet-name',
    label: 'What was the your first pet called?',
  },
  {
    value: 'first-car-name',
    label: 'What was your first car?',
  },
  {
    value: 'first-concert-name',
    label: 'What was the first concert you attended?',
  },
] satisfies Option[];
