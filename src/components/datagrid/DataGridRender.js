import React from "react";
import i18n from "i18n";
import {Flex, Image, Tag, Space, Typography, Button} from "antd";
import moment from "moment";
import {Sorter} from './DataGridProps';
import WebLink from "./editors/WebLink";
import ConfirmLink from "./editors/ConfirmLink";
import InfoCard from "./editors/InfoCardLink";
import DeleteLink from "./editors/DeleteLink";
import {moneyFormatter} from 'common/Utility';
import {EditOutlined} from '@ant-design/icons';
import InfoDrawerLink from "./editors/InfoDrawerLink";
import sampleImage from "img/showcase.webp";

const {Text} = Typography;
const {s3Path} = window['runConfig'];

export const columnRenderType = (props) => {
    const {columnType, cellData} = props;
    switch (columnType) {
        case "ChildData":
            return cellData[props.childName];
        case "Date":
            return moment(cellData).format("DD/MM/YYYY");
        case "Constant":
            if (props.rootLangPath) {
                return i18n.t(`${props.rootLangPath}.${props.constant[cellData]}`);
            }
            return props.constant[cellData]?.title || props.constant[cellData];
        case "Price":
            return <Flex justify="right">{moneyFormatter(cellData)}</Flex>;
        case "Image":
            let imagePath = s3Path + cellData;
            if (!cellData || cellData?.length === 0) {
                imagePath = sampleImage;
            }
            if (Array.isArray(cellData) && cellData.length > 0) {
                const filePath = props.filePath || "filePath";
                imagePath = s3Path + cellData[0][filePath];
            }
            return <Image height={100} alt="sampleImage" src={imagePath}/>;
        case "Boolean":
            let val, color;
            if (cellData) {
                val = "Evet";
                color = "green";
            } else {
                val = "Hayır";
                color = "volcano";
            }
            return <Tag color={color} key={val}>{val}</Tag>
        case "TreeData":
            return cellData.map(m => <Tag color={"cyan"}
                                          key={m[props.treeDataColName]}>{m[props.treeDataColName]}</Tag>);
        case "DateTime":
            return moment(cellData).format("DD/MM/YYYY HH:mm");
        case "WebLink":
            return <WebLink {...props} />;
        case "InfoCardLink":
            return <InfoCard {...props} />;
        case "InfoDrawerLink":
            return (
                <InfoDrawerLink
                    comp={props.comp}
                    title={props.buttonText || "Detay"}
                    record={props.cellData}
                    gridRefresh={props.gridRefresh}
                    gridProps={props}
                />
            );
        case "ConfirmLink":
            return <ConfirmLink {...props} />;
        case "DeleteLink":
            return <DeleteLink {...props} />;
        case "AuthorizedPersonsLink":
            if (cellData && cellData.length > 0) {
                const primaryPerson = cellData;
                const additionalCount = 1;
                return (
                    <Space direction="vertical" size="small">
                        <Text underline style={{cursor: 'pointer'}}>
                            {primaryPerson} {additionalCount > 0 && `(+ ${additionalCount} ${i18n.t("companies.authorized")})`}
                        </Text>

                    </Space>
                );
            }
            return cellData;
        case "Action":
            return (
                <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined/>}
                    style={{
                        backgroundColor: '#f5f5f5',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        padding: '4px 8px'
                    }}
                    onClick={() => {
                        // Eğer onActionClick prop'u varsa onu çağır
                        if (props.onActionClick) {
                            props.onActionClick(props.record || props.cellData);
                        } else {
                            // Varsayılan davranış (geriye uyumluluk için)
                            console.log('Edit clicked for:', props.cellData);
                        }
                    }}
                />
            );
        case "CustomFunction":
            let data = props.record;
            return props.customFunction(data, props);
        default:
            if (props.path) {
                return props.record[props.path]?.[props.name];
            }
            return cellData;
    }
}

export const sortType = (columnType) => {
    var sortType = {};
    switch (columnType) {
        case 'String':
            sortType = Sorter.DEFAULT;
            break;
        // case 'Date':
        //     sortType = Sorter.DATE;
        //     break;
        default:
            sortType = Sorter.DEFAULT;
    }

    return {sorter: {compare: sortType}};
}