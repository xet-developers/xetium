export interface User {
    userName: string;
    email: string;
    avatar?: string;
}

export interface IUserSliceSchema {
    initialized: boolean;
    authData?: User;
}
