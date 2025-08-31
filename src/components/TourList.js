import React from "react";
import {withTranslation} from "react-i18next";
import DataGrid from "components/datagrid/DataGrid";
import TourView from "components/TourView";
import {Card} from "antd";
import i18n from "i18n";

const TourList = () => {
    return (
        <Card title={i18n.t("pages.userList")} variant="borderless">
            <TourListDG/>
        </Card>
    );
};

const TourListDG = () => {
    const dataGridProps = {
        queryName: "tours/getAll",
        method: "GET",
        columnNameList: [
            {name: "username", align: "left", title: "register.username"},
            {name: "name", align: "left", title: "register.name"},
            {name: "surname", align: "left", title: "register.surname"},
            {name: "phone", align: "left", title: "register.phone"},
            {name: "role", align: "left", title: "register.role"},
            {name: "email", align: "left", title: "register.email"},
        ],
    }

    dataGridProps.columnNameList.push({name: "id", title: "infocard", columnType: "InfoCardLink", comp: TourView});

    return <DataGrid {...dataGridProps} />;
};

export default withTranslation()(TourList);