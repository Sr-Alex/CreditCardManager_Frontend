export type UserDTO = {
    id: number;
    userName: string;
    email: string;
};

export type CreateUserDTO = {
    userName: string;
    email: string;
    password: string;
}