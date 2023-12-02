

export const validateMaxNumber = (current: number, maxNumber: number) => {
	return (maxNumber - current) >= 0;
};