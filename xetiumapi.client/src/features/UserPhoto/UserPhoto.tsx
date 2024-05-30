import { ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import cls from './UserPhoto.module.scss';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const UserPhoto = (): React.JSX.Element => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#C0CCF7',
                        colorBorder: '#F66450',
                        controlHeightLG: 140
                    },
                    components: {
                        DatePicker: {
                            activeBorderColor: '#F66450'
                        },
                        Upload: {
                            actionsColor: '#F66450'
                        }
                    }
                }}
            >
                <ImgCrop rotationSlider>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-circle"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        className={cls.upload}
                    >
                        { fileList.length < 1 && '+ Загрузить свое фото' }
                    </Upload>
                </ImgCrop>
            </ConfigProvider>
        </>
    );
};
