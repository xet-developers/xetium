import {FC, memo, ReactElement} from 'react';
import Styles from './RegisteredLayout.module.scss'

export interface IRegisteredLayoutProps {
    header: ReactElement;
    navMenu: ReactElement;
    content: ReactElement
}


export const RegisteredLayout: FC<IRegisteredLayoutProps> = memo((props) => {
    const {header, navMenu, content} = props
    return (
        <div style={{display: "flex"}}>
            <div>{navMenu}</div>
            <div style={{display: "flex", flexDirection: "column", width: '100%'}} className={Styles.page}>
                <div style={{width: '100%'}}>{header}</div>
                <div>{content}</div>
            </div>
        </div>
    );
});
