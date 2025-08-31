import {getDummyData} from "./dummy.service";

const {apiUrl} = window['runConfig'];

export async function callApi(serviceName, options) {
    return await _callApi(serviceName, options || {});
}

async function _callApi(serviceName, options) {
    let method = options.method ? options.method : 'GET';
    let headers;
    if (!serviceName.startsWith("auth")) {
        const userData = JSON.parse(localStorage.getItem('AuthStorage'));
        const token = userData ? userData?.user?.token : "";
        headers = {"Authorization": `Bearer ${token}`};
    }

    if (options.contentType === "form-data") {
        headers = {...headers, "Content-Type": "application/x-www-form-urlencoded"}
    } else if (options.contentType === "multipart") {
        // STOP! Do not add the following header! It automatically appends this header with some extra info
    } else {
        headers = {...headers, "Content-Type": "application/json"}
    }

    const requestOptions = {
        method: method,
        body: options.data,
        headers: headers
    };

    let data;
    try {
        let response;
        if (options.isDummy) {
            response = await getDummyData(serviceName, requestOptions);
            return Promise.resolve(response.data);
        } else {
            response = await window.fetch(`${apiUrl}/${serviceName}`, requestOptions);
        }
        if (response.status === 204) {
            return Promise.resolve(true);
        } else if (!response.ok) {
            if ([403].includes(response.status)) {
                return Promise.reject(`${response.status} Unauthorized`);
            }
            data = await response.json();
            return Promise.reject(data);
        }
        data = await response.json();
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err.message ? err.message : data);
    }
}