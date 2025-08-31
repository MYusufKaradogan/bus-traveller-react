import React, {useState} from "react";
import {Button, Spin} from "antd";
import i18n from '../../../i18n';
import {connect} from "react-redux";

const InfoDrawerLink = (props) => {
    const [state, setState] = useState({drawerVisible: false, componentKey: 0});

    const showDrawer = () => {
        let {componentKey} = state;
        componentKey++;
        setState({...state, drawerVisible: true, componentKey});
    };

    const handleClose = () => {
        setState({...state, drawerVisible: false});
    };

    const getButtonComp = () => {
        return (
            <Button
                key={state.componentKey}
                size="small"
                type="primary"
                onClick={showDrawer}
            >
                {i18n.t(props.title)}
            </Button>
        );
    };

    const getDrawerContent = () => {
        if (props.comp) {
            const {cellData: id, gridRefresh, componentKey, ...otherProps} = props;
            const compProps = {
                record: props.cellData,
                gridRefresh,
                open: state.drawerVisible,
                onClose: handleClose,
                ...otherProps
            };


            return (
                    <Spin spinning={props.loading}>
                        <props.comp {...compProps} />
                    </Spin>
            );
        }
        return null;
    };

    return (
        <div key={state.componentKey}>
            {getButtonComp()}
            {getDrawerContent()}
        </div>
    );
};

const stateCreators = state => {
    return {loading: state.base.loading};
};

export default connect(stateCreators)(InfoDrawerLink);
