import React, {useState} from "react";
import {Droppable} from "react-beautiful-dnd";
import Card from "../Card/Card";
import {Grid, IconButton, Modal} from "@material-ui/core";
import useStyles from "./Column.style";
import {useDispatch} from "react-redux";
import {updateColumn} from "../../state/actions/board-actions";
import AddIcon from '@material-ui/icons/Add';

const grid = 8;

const getListStyle = isDraggingOver => ({
    backgroundColor: isDraggingOver ? "lightblue" : "#ebecf0",
    padding: grid,
    width: 250,
    margin: '0 4px'
});

function Column({value, ind, onClickDelete, onClickAdd}) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitleChange = (e) => {
        let newColumn = {...value};
        newColumn.title = e.target.value;
        dispatch(updateColumn(value.id, newColumn));
    }

    const handleCardChange = (selectedCard) => {
        let newColumn = {...value};
        newColumn.items = newColumn.items.map(card => card.id === selectedCard.id ? selectedCard : card)
        dispatch(updateColumn(value.id, newColumn));
    }

  return (
      <Droppable droppableId={`${ind}`} type="droppableItem">
          {(provided, snapshot) => (
              <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
              >
                  <h2 className={classes.title} onClick={handleOpen}>{value.title}</h2>

                  <Grid container spacing={0}>
                  {value.items.map((item, index) => (
                      <Grid item xs={12} key={item.id} >
                        <Card item={item} index={index} onClickDelete={() => onClickDelete(index)} onCardChange={(newItem) => handleCardChange(newItem)}/>
                      </Grid>
                  ))}
                  {provided.placeholder}
                  </Grid>

                  <IconButton type="button" size={"small"} onClick={onClickAdd}>
                      <AddIcon/> Add another card
                  </IconButton>

                  <Modal
                      open={open}
                      onClose={handleClose}
                      className={classes.modal}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                  >
                      <textarea
                          className={classes.modalContent}
                          defaultValue={value.title}
                          onBlur={handleTitleChange}/>
                  </Modal>
              </div>
          )}
      </Droppable>
  );
}

export default Column;