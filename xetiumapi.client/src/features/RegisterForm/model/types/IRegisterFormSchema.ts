export interface IRegisterFormSchema {
    username: string;
    name: string;
    email: string;
    password: string;
    secPassword: string,
    acceptSpam: boolean,
    acceptPersonalData?: boolean;
    acceptConfPolitics?: boolean;
}

