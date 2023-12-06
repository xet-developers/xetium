export interface IRegisterRequestData{
    name: string
    email: string
    password: string
    checkboxData: boolean
    checkboxConf: boolean
    checkboxSpam: boolean
}

export class RegisterAPI {
    private XHR: XMLHttpRequest

    constructor(URL: string | URL) {
        this.XHR = new XMLHttpRequest();
        this.XHR.setRequestHeader('Content-Type', 'application/json');
        this.XHR.responseType = 'json';
        this.XHR.open('POST', URL, true)
    }

    Send(body: IRegisterRequestData): any {
        this.XHR.send(JSON.stringify(body))

        const res = this.XHR.onload = () => {
            console.log(this.XHR.response)

            return this.XHR.response
        }

        return res
    }
}