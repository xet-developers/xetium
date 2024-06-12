import { memo } from 'react';
import cls from "./FunctionLanding.module.scss";
import { ConfigProvider } from 'antd';
import {ElementFirstFunctionLanding} from "@/features/ElementFisrtFunctionLanding";
import {ElementSecondFunctionLanding} from "@/features/ElementSecondFunctionLanding";
import {ElementThirdFunctionLanding} from "@/features/ElementThirdFunctionLanding";

export const FunctionLanding = memo(() => {

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F66450',
                    colorText: '#252525'
                },
                components: {
                }
            }}
        >
            <div className={cls.container} id="functions">
                <span className={cls.header}>
                    Какие <span style={{color: '#F66450'}}>инструменты</span> мы предлагаем?
                </span>
                <ElementFirstFunctionLanding/>
                <ElementSecondFunctionLanding/>
                <ElementThirdFunctionLanding/>
            </div>
        </ConfigProvider>
    );
});


