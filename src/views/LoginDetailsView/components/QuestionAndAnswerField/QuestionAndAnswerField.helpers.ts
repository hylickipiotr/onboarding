export const getAnswerLabel = (index: number) => {
  return `Answer ${index + 1}`;
};
export const getAnswerName = (name: string, index: number) => {
  return `${name}${index}.answer`;
};
export const getQuestionName = (name: string, index: number) => {
  return `${name}.${index}.question`;
};
export const getQuestionLabel = (index: number) => {
  return `Question ${index + 1}`;
};
