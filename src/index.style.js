import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  body: {
    margin: '0',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', " +
                "'Fira Sans', 'Droid Sans', 'Helvetica Neue', sansSerif",
    '-webkitFontSmoothing': 'antialiased',
    '-mozOsxFontSmoothing': 'grayscale',
  },

  code: {
    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
  },

  root: {
    textAlign: 'center'
  },

  footer: {
    marginTop: '10px'
  }

}));

export default useStyle;
