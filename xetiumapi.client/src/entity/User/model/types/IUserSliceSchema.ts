export interface User {
    userName: string;
    mail: string;
    dateTime: string;
    avatar?: string;
}

export interface IUserSliceSchema {
    initialized: boolean;
    authData?: User;
}
