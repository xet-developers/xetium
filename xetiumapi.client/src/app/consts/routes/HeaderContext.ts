import React from 'react';

interface IHeaderContext {
    headerName: string;
}

export const HeaderContext = React.createContext<IHeaderContext | undefined>(undefined);