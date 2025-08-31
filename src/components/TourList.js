import React from "react";
import {withTranslation} from "react-i18next";
import DataGrid from "components/datagrid/DataGrid";
import TourView from "components/TourView";
import {Card} from "antd";
import i18n from "i18n";
import TourListHeaderExtra from "./TourListHeaderExtra";

const TourList = () => {
    return (
        <Card title={i18n.t("busTraveller.tourList")} variant="borderless" extra={ <TourListHeaderExtra /> }>
            <TourListDG/>
        </Card>
    );
};

const TourListDG = () => {
    const dataGridProps = {
        queryName: "tours/getAll",
        method: "GET",
        columnNameList: [
            {name: "route", align: "left", title: "busTraveller.route"},
            {name: "purpose", align: "left", title: "busTraveller.purpose"},
            {name: "startDate", align: "left", title: "busTraveller.startDate"},
            {name: "endDate", align: "left", title: "busTraveller.endDate"},
            {name: "status", align: "left", title: "busTraveller.status"},
        ],
    }

    dataGridProps.columnNameList.push({name: "id", title: "busTraveller.infocard", columnType: "InfoCardLink", comp: TourView});

    return <DataGrid {...dataGridProps} />;
};

export default withTranslation()(TourList);