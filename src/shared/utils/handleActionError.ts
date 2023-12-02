
export const getThunkError = (error: Error | unknown) => {
	let returnError = 'Something went wrong...';
	if (error instanceof Error) {
		returnError = error.message;
	}
	return returnError;
};