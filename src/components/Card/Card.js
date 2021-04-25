import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {Paper} from "@material-ui/core";
import useStyles from "./Card.style";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#ffffff",

  // styles we need to apply on draggables
  ...draggableStyle
});

function Card({item, index, onClickDelete}) {
    const classes = useStyles();

  return (
      <Draggable
          draggableId={item.id}
          index={index}
      >
          {(provided, snapshot) => (

                  <Paper className={classes.paper}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                      {item.content}
                      <button
                          type="button"
                          onClick={onClickDelete}
                      >
                          delete
                      </button>
                  </Paper>
          )}
      </Draggable>
  );
}

export default Card;