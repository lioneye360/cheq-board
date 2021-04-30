import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  },

  title: {
    'fontSize': '20px',
    'lineHeight': '24px',
    'fontWeight': '600',
    'width': '50%',
    'cursor': 'pointer'
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContent: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    resize: 'none'
  }

}));

export default useStyles;
