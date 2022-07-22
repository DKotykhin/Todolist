const separator = "&#9000;"

export const collectData = (data) => {
    const newData = {
        description: data.title.concat(`${separator}`,
            data.subtitle ? data.subtitle : "", `${separator}`,
            data.desc ? data.desc : "", `${separator}`,
            data.date ? data.date : ""
        ),
        completed: data.completed || false,
    };
    return newData
}

export const parseData = (data) => {
    const title = data.description.split(`${separator}`)[0];
    const subtitle = data.description.split(`${separator}`)[1];
    const desc = data.description.split(`${separator}`)[2];
    const date = data.description.split(`${separator}`)[3];
    return { title, subtitle, desc, date }
}