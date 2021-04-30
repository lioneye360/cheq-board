import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative'
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContent: {
    position: 'relative',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    resize: 'none'
  },

  cardContent: {
    '&:hover': {
      '& $editButton': {
        display: 'inline-flex'
      },
      '& $deleteButton': {
        display: 'inline-flex'
      }
    },
    '&:active': {
      '& $editButton': {
        display: 'inline-flex'
      },
      '& $deleteButton': {
        display: 'inline-flex'
      }
    }
  },

  editButton: {
    position: 'absolute',
    top: '2px',
    right: '4px',
    display: 'none',
    opacity: '0.9'
  },

  deleteButton: {
    position: 'absolute',
    top: '48px',
    right: '4px',
    display: 'none',
    opacity: '0.9'
  },

  cardEdit: {
    '& input[type="file"]': {
      display: 'none'
    }
  },

  customFileUpload: {
    border: '1px solid #ccc',
    display: 'inline-block',
    padding: '6px 12px',
    cursor: 'pointer'
  },



}));

export default useStyles
