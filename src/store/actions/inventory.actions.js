import type from 'store/actionTypes/inventory.action.types';

const changeListType = (isCardList) => ({
    type: type.changeListType,
    payload: {isCardList}
});

const setFilterData = (filters) => ({
    type: type.setFilterData,
    payload: {filters}
});

const clearFilterData = () => ({
    type: type.clearFilterData,
    payload: {filters: {}}
});


export const inventoryActions = {changeListType, setFilterData, clearFilterData};
