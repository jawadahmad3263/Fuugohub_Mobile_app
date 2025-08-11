import axios from 'axios'
import { getUserToken } from '../utils/common'

 
// import { BASE_URL } from '../utils/constant'
const BASE_URL = 'https://fuugohug-production.up.railway.app/api/'
// 'localhost/api/v1'
axios.defaults.baseURL = BASE_URL
 

export const Post = async ({ endpoint, data }) => {
    const token = await getUserToken()

    return new Promise((resolve, reject) => {
        axios
            .post(endpoint, data, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': 'en',
                },
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log('Error', endpoint, error)
                reject(error)
            })
    })
}
export const Patch = async ({ endpoint, data }) => {
    const token = await getUserToken()

    return new Promise((resolve, reject) => {
        axios
            .patch(endpoint, data, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': 'en',
                },
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log('Error', endpoint, error)
                reject(error)
            })
    })
}
export const Put = async ({ endpoint, data }) => {
    const token = await getUserToken()

    return new Promise((resolve, reject) => {
        axios
            .put(endpoint, data, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': 'en',
                },
            })
            .then((response) => {
                console.log(endpoint, response.data)
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(endpoint, error.response.data)
                    console.log(endpoint, error.response.status)
                    console.log(endpoint, error.response.headers)
                }
                reject(error)
            })
    })
}

export const PutQuery = async ({
    endpoint,
    data,
    queryString = '',
    language = 'en',
}) => {
    const token = await getUserToken()

    console.log('language====>', language)
    // Append the query string to the endpoint
    const url = queryString ? `${endpoint}?${queryString}` : endpoint

    return new Promise((resolve, reject) => {
        axios
            .put(url, data, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': language,
                },
            })
            .then((response) => {
                console.log(endpoint, response.data)
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(endpoint, error.response.data)
                    console.log(endpoint, error.response.status)
                    console.log(endpoint, error.response.headers)
                }
                reject(error)
            })
    })
}
//put form data
export const PutFormData = async ({ endpoint, data }) => {
    const token = await getUserToken()

    return new Promise((resolve, reject) => {
        axios
            .put(endpoint, data, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': lang,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'PUT',
                    'Access-Control-Allow-Headers':
                        'Content-Type, Authorization',
                    'Access-Control-Allow-Credentials': 'true',
                },
            })
            .then((response) => {
                console.log(endpoint, response.data)
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(endpoint, error.response.data)
                    console.log(endpoint, error.response.status)
                    console.log(endpoint, error.response.headers)
                }
                reject(error)
            })
    })
}

export const Delete = async ({ endpoint, data }) => {
    const token = await getUserToken()

    return new Promise((resolve, reject) => {
        axios
            .delete(endpoint, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': 'en',
                },
                data: data,
            })
            .then((response) => {
                console.log(endpoint, response.data)
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(endpoint, error.response.data)
                    console.log(endpoint, error.response.status)
                    console.log(endpoint, error.response.headers)
                }
                reject(error)
            })
    })
}

export const PostFormData = async ({ endpoint, data }) => {
    const token = await getUserToken()
    console.log('token', token)
    return new Promise((resolve, reject) => {
        axios
            .post(endpoint, data, {
                headers: {
                    Authorization: `bearer ${token}` || '',
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers':
                        'Content-Type, Authorization',
                    'Access-Control-Allow-Credentials': 'true',
                    'Accept-Language': 'en',
                },
                transformRequest: (data_, headers) => {
                    console.log(endpoint, data)
                    return data
                },
            })
            .then((response) => {
                console.log(endpoint, response.data)
                resolve(response.data)
            })
            .catch((error) => {
                console.log(endpoint, error)
                reject(error)
            })
    })
}
//patch formdata
export const PatchFormData = async ({ endpoint, data }) => {
    const token = await getUserToken()

    return new Promise((resolve, reject) => {
        axios
            .patch(endpoint, data, {
                headers: {
                    Authorization: `bearer ${token}` || '',
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'PATCH',
                    'Access-Control-Allow-Headers':
                        'Content-Type, Authorization',
                    'Access-Control-Allow-Credentials': 'true',
                    'Accept-Language': 'en',
                },
                transformRequest: (data_, headers) => {
                    console.log(endpoint, data)
                    return data
                },
            })
            .then((response) => {
                console.log(endpoint, response.data)
                resolve(response.data)
            })
            .catch((error) => {
                console.log(endpoint, error)
                reject(error)
            })
    })
}

export const PostFormDataFetch = async ({ endpoint, data }) => {
    const token = await getUserToken()
    const newEnd = BASE_URL + endpoint
    console.log(newEnd)
    try {
        const response = await fetch(newEnd, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${token}` || '',
                'Content-Type': 'multipart/form-data',
                'Accept-Language': 'en',
            },
            body: data,
        })
        console.log(response, 'Response')
    } catch (err) {
        console.log('err', err)
    }
}
export const Get = async ({ endpoint, params }) => {
    const token = await getUserToken()
    console.log('token', token)
    return new Promise((resolve, reject) => {
        axios
            .get(endpoint, {
                params: params,
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': 'en',
                },
            })
            .then((response) => {
                console.log(endpoint, params)
                resolve(response.data)
            })
            .catch((error) => {
                console.log('Error', endpoint, error)
                reject(error)
            })
    })
}
export const DeleteWithParams = async ({ endpoint, params }) => {
    const token = await getUserToken()

    return new Promise((resolve, reject) => {
        axios
            .delete(endpoint, {
                params: params,
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': 'en',
                },
            })
            .then((response) => {
                console.log(endpoint, response.data)
                resolve(response.data)
            })
            .catch((error) => {
                console.log('Error', endpoint, error)
                reject(error)
            })
    })
}

export const PutWithParams = async ({ endpoint, params }) => {
    const token = await getUserToken()

    return new Promise((resolve, reject) => {
        axios
            .put(endpoint, {
                params: params,
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': 'en',
                },
            })
            .then((response) => {
                console.log(endpoint, response.data)
                resolve(response.data)
            })
            .catch((error) => {
                console.log('Error', endpoint, error)
                reject(error)
            })
    })
}
export const GetWithoutToken = async ({ endpoint, params }) => {
    const token = await getUserToken()
    return new Promise((resolve, reject) => {
        axios
            .get(endpoint, {
                params: params,
                headers: {
                    'content-type': 'application/json',
                    'Accept-Language': 'en',
                    // Authorization: `bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(endpoint, params)
                resolve(response.data)
            })
            .catch((error) => {
                console.log('Error', endpoint, error)
                reject(error)
            })
    })
}

export const GetWithUserDate = async ({ endpoint, params }) => {
    const token = await getUserToken()

    console.log('token', token)
    return new Promise((resolve, reject) => {
        axios
            .get(endpoint, {
                params: params,
                headers: {
                    'content-type': 'application/json',
                    Authorization: `bearer ${token}`,
                    'Accept-Language': 'en',
                    'user-date': new Date().toISOString(),
                },
            })
            .then((response) => {
                console.log(endpoint, params)
                resolve(response.data)
            })
            .catch((error) => {
                console.log('Error', endpoint, error)
                reject(error)
            })
    })
}
