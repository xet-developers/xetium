export interface IRegisterFormSchema {
    username: string;
    email: string;
    password: string;
    secPassword: string,
    spamCheckbox: boolean,
    acceptPersonalData: boolean;
    acceptConfPolitics: boolean;

    isLoading: boolean;
    error?: string;
}
