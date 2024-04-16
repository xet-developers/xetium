import {FC, useCallback} from 'react';
import {useCreateProject} from "../api/createProject.api.ts";
import {Input} from "../../../shared/ui/components/Input";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {createProjectActions} from "@/features/CreateProject/model/slice/createProject.slice.ts";

interface ICreateProjectProps {

}

export const CreateProject: FC<ICreateProjectProps> = () => {
    //const props: ICreateProjectProps = {}
    const [trigger, result] = useCreateProject()
    const dispatch = useAppDispatch()

    const onChangeProjectName = useCallback(
        (value: string) => {
            dispatch(createProjectActions.setProjectName(value));
        },
        [dispatch],
    );

    const onChangeProjectUrl = useCallback(
        (value: string) => {
            dispatch(createProjectActions.setProjectUrl(value));
        },
        [dispatch],
    );

    const onChangeProjectLabel = useCallback(
        (value: string) => {
            dispatch(createProjectActions.setProjectLabel(value));
        },
        [dispatch],
    );

    return (
        <div>
            <Input onChange={(value: string) => onChangeProjectName(value)}/>
            <Input onChange={(value: string) => onChangeProjectUrl(value)}/>
            <Input onChange={(value: string) => onChangeProjectLabel(value)}/>

            <button onClick={() => trigger({})}></button>
        </div>
    );
};


