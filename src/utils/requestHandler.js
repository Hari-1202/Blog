import store from "../store/store"

export const requestHandler = async ({ url, method = "GET", headers, body }) => {

    const userToken = store.getState().userReducer.token || sessionStorage.getItem('token')
    const defaultHeaders = {
        'Content-Type': 'application/json',
        authToken: userToken
    }

    let reqHeaders
    if (headers) {
        reqHeaders = {
            ...defaultHeaders,
            headers
        }
    } else reqHeaders = defaultHeaders
    const result = await fetch(url, {
        method,
        headers: reqHeaders,
        body: JSON.stringify(body)
    })
    const response = await result.json()
    return response
}