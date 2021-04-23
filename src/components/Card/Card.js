import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    backgroundColor: isDraggingOver ? "lightblue" : "#ebecf0",
    padding: grid,
    width: 250,
    margin: '0 4px'
});

function Card({item, index, onClickDelete}) {

  return (
      <Draggable
          draggableId={item.id}
          index={index}
      >
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
                  <div
                      style={{
                          display: "flex",
                          justifyContent: "space-around"
                      }}
                  >
                      {item.content}
                      <button
                          type="button"
                          onClick={onClickDelete}
                      >
                          delete
                      </button>
                  </div>
              </div>
          )}
      </Draggable>
  );
}

export default Card;