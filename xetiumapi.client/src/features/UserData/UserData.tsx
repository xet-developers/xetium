import React, {useState} from 'react';
import { Form, Input, Typography, ConfigProvider } from 'antd';

const { Paragraph } = Typography;

interface FieldData {
    name: string | number | (string | number)[];
    email: string | number | (string | number)[];
    date: string | number | (string | number)[];
    password: string | number | (string | number)[];
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
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
    >
        <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Введите имя пользователя!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="email"
            label="Username"
            rules={[{ required: true, message: 'Введите email!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="date"
            label="Username"
        >
            <Input disabled={true}/>
        </Form.Item>

        <Form.Item
            name="password"
            label="Username"
            rules={[{ required: true, message: 'Введите пароль!' }]}
        >
            <Input />
        </Form.Item>
    </Form>
);

export const UserData = (): React.JSX.Element => {

    const [fields, setFields] = useState<FieldData[]>([
        { name: ['username'], value: 'nenichv' },
        { email: ['email'], value: 'nenichv' },
        { date: ['date'], value: 'nenichv' },
        { password: ['password'], value: 'nenichv' }
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
                    <Paragraph style={{ maxWidth: 440, marginTop: 24 }}>
                        <pre style={{ border: 'none' }}>{JSON.stringify(fields, null, 2)}</pre>
                    </Paragraph>
                </>
            </ConfigProvider>
        </>
    );
};
