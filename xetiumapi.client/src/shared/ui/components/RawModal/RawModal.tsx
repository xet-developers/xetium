import React from "react";

export const RawModal = ({ isOpen, onClose, className, children, textBtn }) :React.JSX.Element | null => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={className}>
            {children}
            <button onClick={onClose}>{textBtn}</button>
        </div>
    );
};
