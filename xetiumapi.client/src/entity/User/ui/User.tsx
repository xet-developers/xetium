import {FC} from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";

interface IUserProps {
}

export const User: FC<IUserProps> = () => {
    const props: IUserProps = {}
    const dispatch = useAppDispatch()

    return (
        <>
        </>
    );
};


