import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50 } from 'material-ui/styles/colors';

class ImageWidget extends React.Component {

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
        width: '100%',
        height: '100%',
        textAlign: 'left',
        fontSize: '14px'
      }
    };

    return (
      <Paper style={styles.paper}>
        <div style={styles.widgetBody}>
          <img style={{height: '100%', width: '100%', objectFit: 'cover'}} src='./assets/Images/OSI.jpg' alt=''/> 
        </div>
      </Paper>
    );
  }
}


export default ImageWidget;
