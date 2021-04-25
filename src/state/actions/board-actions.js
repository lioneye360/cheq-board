export const addColumn = payload => {
    return {
        type: "COLUMN_ADD",
        item: payload
    };
};

export const addItem = (id, payload) => {
    return {
        type: "CARD_ADD",
        item: payload,
        columnId: id
    };
};

export const updateBoard = payload => {
    return {
        type: "UPDATE_BOARD",
        item: payload
    };
};