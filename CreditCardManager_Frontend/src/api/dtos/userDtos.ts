export type UserDTO = {
    Id: number;
    UserName: string;
    Email: string;
};

export type CreateUserDTO = {
    userName: string;
    email: string;
    password: string;
}