import {InputField} from '@/shared/ui/components/InputField'


export const RegisterForm = () => {
    return (
        <>
            <InputField errorText={'почта должна быть - лялялял'}
                        onChange={(value: string) => value + 'функция работы со стейтом'}
                        isCorrect={() => false}
                        label={'Почта'}
                        placeholder={'введите почту'}/>
        </>
    );
};
