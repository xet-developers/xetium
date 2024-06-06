import React, {FC} from 'react';
import { Form, Input, ConfigProvider } from 'antd';
import cls from './UserData.module.scss';


interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields }) => (

    <Form
        name="global_state"
        layout="inline"
        fields={fields}
        className={cls.form}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
    >
        <div>
            <span className={cls.label}>Имя пользователя:</span>
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Введите имя пользователя!'}]}
                className={cls.item}
            >
                <Input className={cls.input}/>
            </Form.Item>
            <div className={cls.divider}/>

            <span className={cls.label}>Email:</span>
            <Form.Item
                name="email"
                rules={[{required: true, message: 'Введите email!'}]}
                className={cls.item}
            >
                <Input className={cls.input}/>
            </Form.Item>
            <div className={cls.divider}/>
        </div>

        <div>
            <span className={cls.label}>Дата регистрации:</span>
            <Form.Item
                name="date"
                className={cls.item}
            >
                <Input disabled={true} className={cls.input}/>
            </Form.Item>
            <div className={cls.divider}/>

            <span className={cls.label}>Пароль:</span>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Введите пароль!'}]}
                className={cls.item}
            >
                <Input disabled={true} className={cls.input}/>
            </Form.Item>
            <div className={cls.divider}/>
        </div>
    </Form>
);

export const UserData: FC<CustomizedFormProps> = ({fields, onChange}): React.JSX.Element => {

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#C0CCF7'
                    },
                    components: {
                        DatePicker: {
                            activeBorderColor: '#F66450'
                        }
                    }
                }}
            >
                <>
                    <CustomizedForm
                        fields={fields}
                        onChange={(newFields) => {
                            onChange(newFields);
                        }}
                    />
                </>
            </ConfigProvider>
        </>
    );
};
