import React, { useState } from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import Card from "../Card/Card";

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

function Column({value, ind, onClickDelete, onClickAdd}) {

  return (
      <Droppable droppableId={`${ind}`} type="droppableItem">
          {(provided, snapshot) => (
              <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
              >
                  <div>{value.title}</div>
                  {value.items.map((item, index) => (
                      <Card key={item.id} item={item} index={index} onClickDelete={() => onClickDelete(index)}/>
                  ))}
                  {provided.placeholder}

                  <button type="button" onClick={onClickAdd}>
                      Add new item
                  </button>
              </div>
          )}
      </Droppable>
  );
}

export default Column;