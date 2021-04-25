import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Card from "../Card/Card";

const grid = 8;

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