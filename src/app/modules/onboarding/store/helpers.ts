export const calculateProgress = (step: number, totalSteps: number) => {
  return Math.round((step / totalSteps) * 100);
};
