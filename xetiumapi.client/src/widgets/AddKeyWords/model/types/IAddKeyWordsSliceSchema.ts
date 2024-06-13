export interface ISitePosition {
    date: string;
    keyword: string;
    position: number;
    searchSystem: 0 | 1
}

export interface IAddKeyWordsSliceSchema {
    sitePositionCheck: ISitePosition[]
}
