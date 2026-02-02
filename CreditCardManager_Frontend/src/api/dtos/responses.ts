export type responseDTO = {
	success: boolean;
	errors?: object;
	data?: object;
};

export const failedResponse = (errors?: object): responseDTO => {
	return { success: false, errors };
};

export const successResponse = (data?: object): responseDTO => {
	return { success: true, data };
};
