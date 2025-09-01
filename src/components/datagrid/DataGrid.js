import React, {useEffect, useMemo, useRef, useState} from "react";
import 'styles/datagrid.css'
import {Table, Input, Button, Space} from 'antd';
import {withTranslation} from 'react-i18next';
import {SearchOutlined} from '@ant-design/icons';
import {queryService} from "services/query.service";
import i18n from 'i18n';
import {columnRenderType,} from "./DataGridRender";
import InfoCard from "./editors/InfoCardLink";
import {alertActions} from "store/actions/alert.actions";
import {compose} from "redux";
import {connect} from "react-redux";

const DataGrid = (props) => {
    const [state, setState] = useState({data: [], pagination: {current: 1, pageSize: 10,}});
    const {error: showError} = props;
    const components = useRef({searchInput: null, searchText: null, searchedColumn: null, columns: []})

    useEffect(() => {
        const columns = props.columnNameList.map(col => ({
            key: col.name,
            title: col.title ? i18n.t(col.title) : i18n.t(col.name.toString()),
            dataIndex: col.name,
            align: col.align ? col.align : 'center',
            width: col.width,
            ...getColumnSearchProps(col),
        }));
        components.current.columns = columns;
        gridRefresh();
        //eslint-disable-next-line
    }, [props.queryName, props.gridKey]);

    const gridRefresh = () => {
        handleTableChange({pagination: {current: 1, pageSize: 10,}});
    }
    const handleTableChange = ({pagination, filters, sorter, extra}) => {
        if (props.filters) {
            filters = {...props.filters, ...filters};
        }
        if (sorter) {
            const {field, order} = sorter;
            sorter = {sortBy: field, sortDirection: order === "ascend" ? "asc" : "desc"};
        }

        let payload, queryParams;
        if (props.method === "GET") {
            payload = {pageIndex: pagination.current - 1, pageSize: pagination.pageSize, ...filters, sorter};
            queryParams = {queryName: props.queryName, payload}//{ queryName: props.queryName, ...pagination, ...sorter, filters };
        } else {
            payload = {pageIndex: pagination.current - 1, pageSize: pagination.pageSize, ...filters, sorter};
            queryParams = {queryName: props.queryName, payload}//{ queryName: props.queryName, ...pagination, ...sorter, filters };
        }
        getQueryData({queryParams, pagination});
    }

    const getQueryData = ({queryParams, pagination}) => {
        setState({...state, loading: true});

        if (props.method === "POST") {
            queryService.executeQueryWithBody(queryParams).then(result => {
                pagination.total = result.totalElements || result.length;
                setState({...state, data: result.content || result, pagination, loading: false});
            }).catch(err => {
                showError(i18n.t("error"), err.error === "Unauthorized" ? i18n.t("unauthorized") : err.error);
                setState({...state, pagination, loading: false});
            });
        } else {
            queryService.executeQuery(queryParams).then(result => {
                pagination.total = result.totalElements || result.length;
                setState({...state, data: result.content || result, pagination, loading: false});
            }).catch(err => {
                showError(i18n.t("error"), err.error === "Unauthorized" ? i18n.t("unauthorized") : err.error);
                setState({...state, pagination, loading: false});
            });
        }
    }

    const getColumnSearchProps = (colProps) => {
        const {dataIndex, columnType} = colProps;
        if (columnType && columnType.indexOf("Link") > -1) {
            return {
                render: (cellData, record) => columnRenderType({
                    ...colProps,
                    gridRefresh,
                    cellData,
                    record,  // record'u da geç
                    onActionClick: props.onActionClick
                })
            };
        }
        const column = {
            ellipsis: true,
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div style={{padding: 8}}>
                    <Input
                        ref={node => {
                            components.current.searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({closeDropdown: false});
                                components.current.searchText = selectedKeys[0];
                                components.current.searchedColumn = dataIndex;
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,

            render: (cellData, record) => columnRenderType({
                ...colProps,
                gridRefresh,
                cellData,
                record,  // record'u da geç
                onActionClick: props.onActionClick
            }),
            //...sortType(columnType, null),
        }
        return column;
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        components.current.searchText = selectedKeys[0];
        components.current.searchedColumn = dataIndex;
    };

    const handleReset = clearFilters => {
        clearFilters();
        components.current.searchText = "";
    };

    const newRecordLink = useMemo(() => {
        if (props.newRecordComponent) {
            const infoCardProps = {comp: props.newRecordComponent, title: "newrecord", gridRefresh, gridProps: props};
            return <InfoCard {...infoCardProps} />
        } else {
            return null;
        }
        //eslint-disable-next-line
    }, [props.queryName, props.gridKey])

    return (<>
        {newRecordLink}
        <Table
            rowKey={record => record.id}
            sticky
            bordered={true}
            size="large"
            columns={components.current.columns}
            dataSource={state.data}
            rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log('selectedRowKeys changed: ', selectedRowKeys);
                    console.log('selectedRows: ', selectedRows);
                },
            }}
            pagination={{
                ...state.pagination, position: ['bottomRight'],
                showTotal: (total) => `${i18n.t('total')}: ${total} `,
                showSizeChanger: true,
                showQuickJumper: true,
            }}
            loading={state.loading}
            onChange={(pagination, filters, sorter, extra) => handleTableChange({pagination, filters, sorter, extra})}
            rowClassName={(record, index) => {
                if (record.isGroupHeader) {
                    return "group-header";
                } else if (index % 2 === 0) {
                    return "table-row-dark";
                } else {
                    return "table-row-light";
                }
            }}
        />
    </>);
}

const mapDispatchToProps = {...alertActions};
export default compose(withTranslation(), connect(null, mapDispatchToProps))(DataGrid);
