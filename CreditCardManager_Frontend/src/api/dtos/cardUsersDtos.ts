import type { UserDTO } from "./userDtos";

export type CardUsersDTO = {
	cardId: number;
	users: Array<UserDTO>;
};
