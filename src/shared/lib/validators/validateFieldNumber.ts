

export const validateFieldNumber = (value: number): boolean => {
  return !Boolean(!value || value === 0);
}