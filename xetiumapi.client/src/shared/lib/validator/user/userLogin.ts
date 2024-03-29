class UserValidator {
    static validateUserName(userName: string) {
        const reg = new RegExp("^([A-Za-z]{5,20})$")
        return reg.test(userName)
    }

    static validateEmail(email: string) {
        const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return reg.test(email)
    }

    static validatePassword(password: string) {
        const reg = /^(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)[\w$#%&!?.-]+$/;
        return reg.test(password)
    }

    static validateRepeatPassword(password: string, repeatPassword: string) {
        return password === repeatPassword
    }
}
