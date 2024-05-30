import React from "react";
import cls from './RawModal.module.scss';

export const RawModal = ({onSubmint, isOpen, onClose, className, children, textBtn }) :React.JSX.Element | null => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={className}>
            <div className={cls.blockData}>
                {children}
                <div className={cls.btn}>
                    <button className={cls.completeBtn} onClick={onSubmint}>OK</button>
                    <button  className={cls.cancelBtn} onClick={onClose}>{textBtn}</button>
                </div>

            </div>

        </div>
    );
};
