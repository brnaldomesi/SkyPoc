import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50 } from 'material-ui/styles/colors';

class GenericWidget extends React.Component {

  render() {

    const styles = {
      paper: {
        marginTop: this.props.marginTop,
        backgroundColor: grey50,
        height: this.props.height
      },
      widgetBody: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%',
        height: 75,
        textAlign: 'left',
        fontSize: '14px'
      }
    };

    return (
      <Paper style={styles.paper}>
        <div style={styles.widgetBody}>
          </div>
      </Paper>
    );
  }
}


export default GenericWidget;
