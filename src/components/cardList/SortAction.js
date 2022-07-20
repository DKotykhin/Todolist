const SortAction = (taskdata, data, sort) => {
    let newData;
    const createdA = [...taskdata].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
    );
    const deadlineA = [...taskdata].sort((a, b) =>
        a.description.split("&#9000;")[3] < b.description.split("&#9000;")[3] ? 1 : -1
    );
    const titleA = [...taskdata].sort((a, b) =>
        a.description > b.description ? 1 : -1
    );
    const createdZ = [...taskdata].sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : -1
    );
    const deadlineZ = [...taskdata].sort((a, b) =>
        a.description.split("&#9000;")[3] > b.description.split("&#9000;")[3] ? 1 : -1
    );
    const titleZ = [...taskdata].sort((a, b) =>
        a.description < b.description ? 1 : -1
    );

    if (sort === 'Z-a') {
        switch (data) {
            case "created":
                newData = createdZ;
                break;
            case "deadline":
                newData = deadlineZ;
                break;
            case "title":
                newData = titleZ;
                break;
            default:
                newData = createdZ;
        }
    } else {
        switch (data) {
            case "created":
                newData = createdA;
                break;
            case "deadline":
                newData = deadlineA;
                break;
            case "title":
                newData = titleA;
                break;
            default:
                newData = createdA;
        }
    }
    return newData;
}

export default SortAction;