export interface User {
    name: string;
    email: string;
    avatar?: string;
}

export interface IUserSliceSchema {
    initialized: boolean;
    authData?: User;
}
