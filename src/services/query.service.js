import {callApi} from "./base.services";

export const queryService = {executeQuery, executeQueryWithBody, executeLink};

async function executeQuery(queryParams) {
    const {queryName, payload, ...queryFilters} = queryParams;
    let serviceName = queryName;
    if (Object.keys(queryFilters).length > 0) {
        serviceName += "?" + new URLSearchParams(queryFilters);
    } else if (Object.keys(payload).length > 0) {
        serviceName += "?" + new URLSearchParams(payload);
    }
    try {
        let response = await callApi(serviceName, {isDummy: true});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function executeQueryWithBody(queryParams) {
    const {queryName, payload} = queryParams;
    let serviceName = queryName;
    try {
        let response = await callApi(serviceName, {isDummy: true, method: "POST", data: JSON.stringify(payload)});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function executeLink(pathName, urlParams) {
    try {
        let response = await callApi(pathName, urlParams);
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

