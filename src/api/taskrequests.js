import axios from 'axios'

const Base_URL = 'https://api-nodejs-todolist.herokuapp.com/';

axios.defaults.baseURL = Base_URL;

export const GetAllTasks = async(token) => {
    const config = {
        method: 'GET',
        url: 'task',
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
        url: 'task',
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
        url: `task/${id}`,
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
        url: `task/${id}`,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    };

    const result = await axios(config);
    return result;
}