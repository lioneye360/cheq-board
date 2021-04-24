import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import Column from "../Column/Column";

// fake data generator

const createBoard = (title, items) => {
    return {
        id: `board-${Date.now() + (Math.random()*1000000).toFixed(0)}`,
        title: title ? title : 'Board Title',
        items: items && Array.isArray(items) ? items : []
    }
}

const createItem = (title, content) => {
    return {
        id: `item-${new Date().getTime()}`,
        title: title ? title : 'Item Title',
        content: content ? content : '',
    }
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const INITIAL_BOARDS = [
    createBoard('To-do'),
    createBoard('Progress'),
    createBoard('Done')
]

function App() {
  const [state, setState] = useState(INITIAL_BOARDS);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside lists
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (result.type === "droppableColumn") {
      const columns = reorder(state, source.index, destination.index);
      const newState = [...columns];
      setState(newState);
      return;
    }

    // dropped inside the same list
    if (sInd === dInd) {
      const items = reorder(state[sInd].items, source.index, destination.index);
      const newState = [...state];
      newState[sInd].items = items;
      setState(newState);
    }
    else {
      const result = move(state[sInd].items, state[dInd].items, source, destination);
      const newState = [...state];
      newState[sInd].items = result[sInd];
      newState[dInd].items = result[dInd];
      setState(newState);
    }
  }

    const deleteItem = (boardIndex, itemIndex) => {
        const newState = [...state];
        newState[boardIndex].items.splice(itemIndex, 1);
        setState(
            newState
        );
    };

    const addItem = (boardIndex) => {
        const newState = [...state];
        newState[boardIndex].items.push(createItem());
        setState(
            newState
        );
    };


    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        display: 'flex',
        padding: grid,
        overflow: 'auto',
    });

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle,
    });

// a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

  return (
      <div>
        <button
            type="button"
            onClick={() => {
              setState([...state, createBoard()]);
            }}
        >
          Add new Board
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

                          {state.map((el, ind) => (
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
                                        <div>{el.title}</div>
                                        <Column key={ind} value={el} ind={ind} onClickDelete={(index) => deleteItem(ind, index)} onClickAdd={() => addItem(ind)}/>
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