import React, {useState} from 'react';
import { Form, Input, ConfigProvider } from 'antd';
import cls from './UserData.module.scss';
import {useGetUserDataQuery} from "@/entity/User/api/User.api.ts";

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
                label=""
                rules={[{required: true, message: 'Введите имя пользователя!'}]}
                className={cls.item}
            >
                <Input className={cls.input}/>
            </Form.Item>
            <div className={cls.divider}/>

            <span className={cls.label}>Email:</span>
            <Form.Item
                name="email"
                label=""
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
                label=""
                className={cls.item}
            >
                <Input disabled={true} className={cls.input}/>
            </Form.Item>
            <div className={cls.divider}/>

            <span className={cls.label}>Пароль:</span>
            <Form.Item
                name="password"
                label=""
                rules={[{required: true, message: 'Введите пароль!'}]}
                className={cls.item}
            >
                <Input className={cls.input}/>
            </Form.Item>
            <div className={cls.divider}/>
        </div>
    </Form>
);

export const UserData = (): React.JSX.Element => {
    const {data: user} = useGetUserDataQuery()

    const [fields, setFields] = useState<FieldData[]>([
        { name: ['username'], value: user?.userName },
        { name: ['email'], value: user?.email },
        { name: ['date'], value: '30.05.2024' },
        { name: ['password'], value: '********' }
    ]);

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
                            setFields(newFields);
                        }}
                    />
                </>
            </ConfigProvider>
        </>
    );
};
