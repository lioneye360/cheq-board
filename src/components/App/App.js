import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "../Column/Column";
import {useDispatch, useSelector} from "react-redux";
import {addColumn, addItem, updateBoard} from "../../state/actions/board-actions";
import {createBoard, createItem, move} from "../../sevices/boardHelper";

function App() {
  const dispatch = useDispatch();
  const board = useSelector(state => state.app.board);

    function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside lists
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (result.type === "droppableColumn") {
      const columns = reorder(board, source.index, destination.index);
      const newColumns = [...columns];
      dispatch(updateBoard(newColumns));
      return;
    }

    // dropped inside the same list
    if (sInd === dInd) {
      const items = reorder(board[sInd].items, source.index, destination.index);
      const newState = [...board];
      newState[sInd].items = items;
      dispatch(updateBoard(newState));
    }
    else {
      const result = move(board[sInd].items, board[dInd].items, source, destination);
      const newState = [...board];
      newState[sInd].items = result[sInd];
      newState[dInd].items = result[dInd];
      dispatch(updateBoard(newState));
    }
  }

    const deleteItem = (boardIndex, itemIndex) => {
        const newState = [...board];
        newState[boardIndex].items.splice(itemIndex, 1);
        dispatch(updateBoard(newState));
    };

    const addItemById = (columnId) => {
        dispatch(addItem(columnId, createItem()));
    };

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'transparent',
        display: 'flex',
        padding: grid,
        overflow: 'auto',
    });

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,
        borderRadius: '4px',

        // change background color if dragging
        background: isDragging ? 'lightgreen' : '#ebecf0',

        ...draggableStyle,
    });

    // reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

  return (
      <div style={{height: '100%', background: 'linear-gradient( 45deg, #2ACCE5, #0079bf, #315989, #c377e0)'}}>
        <button
            style={{ margin: grid, borderRadius: '3px', border: 'none' }}
            type="button"
            onClick={() => {
                dispatch(addColumn(createBoard()));
            }}
        >
          + Add another board
        </button>

        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="board-drop" type="droppableColumn" direction="horizontal">
                  {(provided, snapshot) => (
                      <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                      >

                          {board.map((el, ind) => (
                            <Draggable key={el.id} draggableId={el.id} index={ind}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <Column key={ind} value={el} ind={ind}
                                                onClickDelete={(index) => deleteItem(ind, index)}
                                                onClickAdd={() => addItemById(el.id)}/>
                                    </div>
                                )}
                            </Draggable>
                        ))}

                          {provided.placeholder}
                      </div>
                  )}
              </Droppable>
          </DragDropContext>
        </div>
      </div>
  );
}

export default App;