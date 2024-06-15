import cls from "./Clusters.module.scss";
import {Button, ConfigProvider} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {useDeleteWordClusterMutation, useGetAllWordClusterQuery} from "@/entity/WordsCluster";
import {DeleteModal} from "@/shared/ui/components/DeleteModal";
import { useState } from "react";
import {useSelector} from "react-redux";
import {currentProjectId} from "@/entity/Project";

export const Clusters = () => {
    const projId = useSelector(currentProjectId)
    const {data: cluster, isLoading} = useGetAllWordClusterQuery(projId!);

    const [trigger, {isLoading: isLoadingDelete}] = useDeleteWordClusterMutation();
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [currentClusterId, setCurrentClusterId] = useState('')

    const empty = () => {
        return (
            <div className={cls.blockEmpty}>
                <span className={cls.empty}>
                    Вы еще не сохранили ни одного кластера!
                    <br/>
                    Создать кластер можно в блоке слева, максимальное количество 3.
                </span>
            </div>
        )
    }

    const deleteCluster = (id: string) => {
        trigger(id);
        setIsModalDeleteOpen(false);
    }

    const deleteClusterId = (id: string) => {
        setCurrentClusterId(id);
        setIsModalDeleteOpen(true);
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F66450',
                    colorText: '#252525'
                },
                components: {
                    DatePicker: {
                        activeBorderColor: '#F66450'
                    },
                    Button: {
                        textHoverBg: '#ba4c3b',
                        defaultActiveBg: '#ba4c3b'
                    }
                }
            }}
        >
            <div className={cls.container}>
                <span className={cls.header}>Сохраненные кластеры</span>
                {!cluster  ? empty() :
                    <div className={cls.clusters} style={{maxWidth: '740px', overflowX: "auto"}}>

                        {cluster.map((el, index) => (
                            <div className={cls.blockCluster}>
                                <span className={cls.text}>Кластер {index + 1}</span>
                                <span className={cls.textCluster} style={{maxHeight: "100px", overflowY: "auto"}}>
                                    {el.keywords.join(', ')}
                                </span>
                                <Button onClick={() => deleteClusterId(el.id!)} className={cls.btn}><DeleteOutlined/>
                                    {isLoadingDelete ? ' Удаление...' : 'Удалить кластер'}
                                </Button>
                            </div>
                        ))
                        }
                    </div>
                }
            </div>
            <DeleteModal open={isModalDeleteOpen} setOpen={setIsModalDeleteOpen} functionDelete={()=>deleteCluster(currentClusterId)}/>
        </ConfigProvider>
    );
};


