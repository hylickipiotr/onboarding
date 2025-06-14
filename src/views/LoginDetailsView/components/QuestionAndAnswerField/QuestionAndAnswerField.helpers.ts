export const getAnswerLabel = (index: number) => {
  return `Answer ${index + 1}`;
};
export const getAnswerId = (name: string, index: number) => {
  return `${name}[${index}]-answer`;
};
export const getQuestionId = (name: string, index: number) => {
  return `${name}[${index}]`;
};
export const getQuestionLabel = (index: number) => {
  return `Question ${index + 1}`;
};
