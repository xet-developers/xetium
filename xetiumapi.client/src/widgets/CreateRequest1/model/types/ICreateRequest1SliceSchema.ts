export enum IntentType
{
    All,
    Navigation,
    Transactional,
    Informational,
    Comparison
}

export interface ICreateRequestResp {
    comparison: string[]
    informational: string[]
    navigational: string[]
    transactional: string[]
}

export interface ICreateRequest1SliceSchema {
    intends?: ICreateRequestResp;
}
