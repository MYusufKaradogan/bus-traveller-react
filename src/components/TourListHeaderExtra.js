import React from "react";
import {withTranslation} from "react-i18next";
import {Space, Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const TourListHeaderExtra = () => {

    const onNewAdd = () => {
        console.log("Görünüm");
    };

    return (
        <Space>
            <Button type="default" onClick={onNewAdd} icon={<PlusOutlined />}>
            </Button>
        </Space>
    );
};

export default withTranslation()(TourListHeaderExtra);
