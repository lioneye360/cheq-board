import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Card from "../Card/Card";
import {Grid} from "@material-ui/core";

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
                  <h2 style={{'font-size': '20px', 'line-height': '24px', 'font-weight': '600'}}>{value.title}</h2>
                      <Grid container spacing={0}>
                      {value.items.map((item, index) => (
                          <Grid item xs={12} key={item.id} >
                            <Card item={item} index={index} onClickDelete={() => onClickDelete(index)}/>
                          </Grid>
                      ))}
                      {provided.placeholder}
                      </Grid>

                  <button type="button" onClick={onClickAdd}>
                      Add new item
                  </button>
              </div>
          )}
      </Droppable>
  );
}

export default Column;