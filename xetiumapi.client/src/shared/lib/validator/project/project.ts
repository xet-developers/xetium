export class ProjectValidator {
    static validateNameProject(projectName: string) {
        const reg = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9_ ]{1,30}$/;
        return reg.test(projectName);
    }

    static validateUrlProject(projectUrl: string) {
        const reg = /(https?:\/\/(?:www\d*\.|(?!www\d*\.))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\d*\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\d*\.|(?!www\d*\.))[a-zA-Z0-9]+\.[^\s]{2,}|www\d*\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        return reg.test(projectUrl);
    }

    static validateDescProject(projectDesc: number) {
        return projectDesc >= 0 && projectDesc <= 150;
    }
}
