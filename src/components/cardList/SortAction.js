const SortAction = (taskdata, data, sort) => {
    let newData;
    const createdA = [...taskdata].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
    );
    const updatedA = [...taskdata].sort((a, b) =>
        a.updatedAt < b.updatedAt ? 1 : -1
    );
    const namedA = [...taskdata].sort((a, b) =>
        a.description > b.description ? 1 : -1
    );
    const createdZ = [...taskdata].sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : -1
    );
    const updatedZ = [...taskdata].sort((a, b) =>
        a.updatedAt > b.updatedAt ? 1 : -1
    );
    const namedZ = [...taskdata].sort((a, b) =>
        a.description < b.description ? 1 : -1
    );

    if (sort === 'Z-a') {
        switch (data) {
            case "created":
                newData = createdZ;
                break;
            case "updated":
                newData = updatedZ;
                break;
            case "name":
                newData = namedZ;
                break;
            default:
                newData = createdZ;
        }
    } else {
        switch (data) {
            case "created":
                newData = createdA;
                break;
            case "updated":
                newData = updatedA;
                break;
            case "name":
                newData = namedA;
                break;
            default:
                newData = createdA;
        }
    }
    return newData;
}

export default SortAction;