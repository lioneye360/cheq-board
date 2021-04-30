import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    IconButton,
    List,
    ListItem,
    Modal,
    Paper
} from "@material-ui/core";
import useStyles from "./Card.style";
import DeleteIcon from '@material-ui/icons/Delete'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from "@material-ui/icons/Add";

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

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        let fReader = new FileReader();

        fReader.onload = function() {
            // let imageElement = document.getElementById(`card-image-${item.id}`);
            // imageElement.src = fReader.result;

            //fReader.result.split(/base64,\//)[1]
            let newColumn = {...item};
            newColumn.image = fReader.result;
            onCardChange(newColumn);
        };
        fReader.readAsDataURL(file);
    };

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

                  <div className={classes.cardContent}>
                      <Fab size="small" aria-label="delete" className={classes.deleteButton}>
                          <DeleteIcon onClick={onClickDelete}/>
                      </Fab>

                      <Fab size="small" aria-label="add" className={classes.editButton}>
                          <EditIcon onClick={handleOpen}/>
                      </Fab>

                      <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={12}>
                              { item.image && <img id={`card-image-${item.id}`} src={item.image} style={{'width': '100%', 'height': '100%'}} alt="card-image"/> }
                          </Grid>
                          <Grid item xs={9}>
                              <h3 style={{'fontSize': '16px', 'fontWeight': '400', textAlign: 'left' }}>{item.title}</h3>
                          </Grid>

                      </Grid>
                  </div>

                  <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="dialog-title"
                      aria-describedby="dialog-description"
                      fullWidth={true}
                  >
                    <DialogTitle id="dialog-title">Card Edit</DialogTitle>

                    <DialogContent>
                        <Grid container spacing={1} alignItems={"center"} classes={{root: classes.cardEdit}}>
                            <Grid item xs={6}>
                              <label htmlFor={`file-upload-${item.id}`} className={classes.customFileUpload}>
                                  Change Cover Image
                                  <div className="MuiButtonBase-root MuiIconButton-root">
                                      <InsertPhotoIcon/>
                                  </div>
                              </label>
                              <input id={`file-upload-${item.id}`} type="file" accept="image/*" onChange={handleFileChange}/>
                            </Grid>

                            <Grid item xs={4}>
                                { item.image && <img id={`card-image-${item.id}`} src={item.image} style={{'max-height': '90px'}} alt="card-image"/> }
                            </Grid>
                            <Grid item xs={12}>
                                <textarea
                                 className={classes.modalContent}
                                 defaultValue={item.title}
                                 onBlur={handleTitleChange}/>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </DialogContent>
                  </Dialog >

              </Paper>

          )}
      </Draggable>
  );
}

export default Card;