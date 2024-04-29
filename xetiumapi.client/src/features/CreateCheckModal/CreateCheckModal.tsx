import cls from "./CreateCheckModule.module.scss";
import {RawModal} from "@/shared/ui/components/RawModal/RawModal.tsx";
import { DownOutlined, CalendarOutlined, FieldTimeOutlined, RetweetOutlined, ClusterOutlined, SearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Calendar, theme, TimePicker, MenuProps, Dropdown, message, Space, Checkbox } from 'antd';

export const CreateCheckModal = ({modalOpen, closeModal}):React.JSX.Element => {

    const { token } = theme.useToken();
    const format = 'HH:mm';

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const items: MenuProps['items'] = [
        {
            label: 'Первый кластер',
            key: '1',
        },
        {
            label: 'Второй кластер',
            key: '2',
        },
        {
            label: 'Третий кластер',
            key: '3',
        },
    ];

    const onClick: MenuProps['onClick'] = ({ label }) => {
        message.info(`Вы выбрали ${label}`);
    };

    return (
        <RawModal isOpen={modalOpen} onClose={closeModal} className={cls.Modal} textBtn={'Отмена'}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F66450'
                    },
                    components: {
                        DatePicker: {
                            activeBorderColor: '#F66450'
                        }
                    }
                }}
            >
                <div style={{marginTop: '1em', marginLeft: '1em', display: 'flex', flexDirection: 'row', gap: '1em'}}>
                    <div className={cls.blockData}>
                        <div className={cls.headerData}>
                            <CalendarOutlined style={{color: '#454545'}}/>
                            <span>Дата</span>
                        </div>
                        <div style={wrapperStyle}>
                            <Calendar fullscreen={false}/>
                        </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <FieldTimeOutlined style={{color: '#454545'}}/>
                                <span>Время</span>
                            </div>
                            <TimePicker minuteStep={15} hourStep={1} format={format} style={{colorPrimary: '#252525', marginTop: '1em'}}/>
                        </div>

                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <RetweetOutlined style={{color: '#454545'}}/>
                                <span>Повторение</span>
                            </div>

                        </div>

                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <ClusterOutlined style={{color: '#454545'}}/>
                                <span>Кластер ключевых слов</span>
                            </div>
                            <Dropdown menu={{items, onClick}}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space style={{marginTop: '1em', fontSize: '14px'}}>
                                        Выберите кластер
                                        <DownOutlined/>
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>

                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <SearchOutlined style={{color: '#454545'}}/>
                                <span>Поисковая система</span>
                            </div>
                            <div className={cls.checkbox}>
                                <Checkbox>Yandex</Checkbox>
                                <Checkbox>Google</Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </RawModal>
    );
};
