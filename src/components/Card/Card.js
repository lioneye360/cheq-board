import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {Grid, Modal, Paper} from "@material-ui/core";
import useStyles from "./Card.style";
import {useDispatch} from "react-redux";
import {updateColumn} from "../../state/actions/board-actions";

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

function Card({item, index, onClickDelete, onCardChange}) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitleChange = (e) => {
        let newColumn = {...item};
        newColumn.title = e.target.value;
        onCardChange(newColumn);
    }

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


                  <Grid container spacing={0} alignItems={"center"}>
                      <Grid item xs={9}>
                          <h3 style={{'fontSize': '16px', 'fontWeight': '400', textAlign: 'left' }} onClick={handleOpen}>{item.title}</h3>
                      </Grid>
                      <Grid item xs={3}>
                          <button
                              type="button"
                              onClick={onClickDelete}
                          >
                              delete
                          </button>
                      </Grid>

                  </Grid>

                  <Modal
                      open={open}
                      onClose={handleClose}
                      className={classes.modal}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                  >
                      <textarea
                          className={classes.modalContent}
                          defaultValue={item.title}
                          onBlur={handleTitleChange}/>
                  </Modal>
              </Paper>

          )}
      </Draggable>
  );
}

export default Card;