import axios from 'axios'

const Base_URL = 'https://api-nodejs-todolist.herokuapp.com/';

export const GetAllTasks = async(token) => {
    const config = {
        method: 'GET',
        url: `${Base_URL}task`,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };

    const result = await axios(config);
    return result;
}

export const AddTask = async(data, token) => {
    const config = {
        method: 'POST',
        url: `${Base_URL}task`,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result;
}

export const UpdateTask = async(data, token, id) => {
    const config = {
        method: 'PUT',
        url: `${Base_URL}task/${id}`,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result;
}

export const DeleteTask = async(token, id) => {
    const config = {
        method: 'DELETE',
        url: `${Base_URL}task/${id}`,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };

    const result = await axios(config);
    return result;
}