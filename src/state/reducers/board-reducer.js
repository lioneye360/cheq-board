import {createBoard} from "../../sevices/boardHelper";

const initialState = {
    board: [
        createBoard('To-do'),
        createBoard('Progress'),
        createBoard('Done')
    ]
}

const boardReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'COLUMN_ADD':
            return {
                ...state,
                board: [...state.board, action.item]
            }
        case 'CARD_ADD':
            return {
                ...state,
                board: state.board.map(
                        (column) => column.id === action.columnId ? {...column, items: column.items.concat(action.item)} : column)
            }
        case 'UPDATE_BOARD':
            return {
                ...state,
                board: action.item
            }
        default:
            return state;
    }

};

export default boardReducer;