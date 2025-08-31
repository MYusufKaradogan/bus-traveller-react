import type from 'store/actionTypes/inventory.action.types';

const userStorage = JSON.parse(localStorage.getItem('AdzieInventory'));

const initialState = {
    isCardList: true,
};

const inventory = (state = userStorage || initialState, action) => {
    switch (action.type) {
        case type.changeListType:
            state = {...state, ...action.payload};
            break;
        case type.setFilterData:
            state = {...state, ...action.payload};
            break;
        case type.clearFilterData:
            state = {...state, ...action.payload};
            break;
        default:
            return state;
    }
    localStorage.setItem('AdzieInventory', JSON.stringify(state));
    return {...state};
};

export {inventory};