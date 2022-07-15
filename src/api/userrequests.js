import axios from 'axios'

const Base_URL = 'https://api-nodejs-todolist.herokuapp.com/';

export const GetLogin = async(data) => {
    const config = {
        method: 'POST',
        url: `${Base_URL}user/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result;
}

export const GetRegister = (data) => {
    const config = {
        method: 'POST',
        url: `${Base_URL}user/register`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    const result = axios(config);
    return result;
}

export const UpdateUser = async(data, token) => {
    const config = {
        method: 'PUT',
        url: `${Base_URL}user/me`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result;
}

export const DeleteUser = async(token) => {
    const config = {
        method: 'DELETE',
        url: `${Base_URL}user/me`,
        headers: {
            'Authorization': token
        }
    };

    const result = await axios(config);
    return result;
}

export const UploadAvatar = async(data, token) => {
    const config = {
        method: 'POST',
        url: `${Base_URL}user/me/avatar`,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    const result = await axios(config);
    return result;
}

export const GetAvatar = async(id) => {
    const config = {
        method: 'GET',
        url: `${Base_URL}user/${id}/avatar`,
        headers: {},
    };

    const result = await axios(config);
    return result;
}

export const DeleteAvatar = async(token) => {
    const config = {
        method: 'DELETE',
        url: `${Base_URL}user/me/avatar`,
        headers: {
            'Authorization': token,
        }
    };

    const result = await axios(config);
    return result;
}