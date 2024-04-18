import { type ReactNode, type FC } from 'react';

import { classNames } from './../../../lib/classNames/classNames.tsx';

import { toggleFeatures } from '@/shared/lib/features';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    onClose?: () => void;
    isOpen?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
    const { className, children, onClose, isOpen = false } = props;

    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });

    const mods: Record<string, boolean | undefined> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (!isMounted) return null;

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(cls.modal, mods, [
                    className,
                    'app_modal',
                    toggleFeatures({
                        on: () => cls.modalNew,
                        off: () => cls.modalOld,
                    }),
                ])}
            >
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};