const symbol = "&#9000;"

export const collectData = (data) => {
    const newData = {
        description: data.title.concat(`${symbol}`,
            data.subtitle ? data.subtitle : "", `${symbol}`,
            data.desc ? data.desc : "", `${symbol}`,
            data.date ? data.date : ""
        ),
        completed: data.completed || false,
    };
    return newData
}

export const parseData = (data) => {
    const title = data.description.split(`${symbol}`)[0];
    const subtitle = data.description.split(`${symbol}`)[1];
    const desc = data.description.split(`${symbol}`)[2];
    const date = data.description.split(`${symbol}`)[3];
    return { title, subtitle, desc, date }
}