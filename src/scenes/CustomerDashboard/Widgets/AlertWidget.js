import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50, orange400 } from 'material-ui/styles/colors';

class GenericWidget extends React.Component {

  render() {

    const styles = {
      paper: {
        marginTop: this.props.marginTop,
        backgroundColor: grey50,
        height: this.props.height
      },
      widgetBody: {
        padding: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%',
        height: 75,
        textAlign: 'left',
        fontSize: '14px'
      },
      buttonStyle: {
        margin: 12
      }
    };

    return (
      <Paper style={styles.paper}>
        <div style={styles.widgetBody}>
  
          <div style={{ marginTop: '-3px', height: '28px', lineHeight: '28px', borderWidth: 1, borderStyle: 'solid', backgroundColor: orange400, textAlign: 'center', color: 'white', borderColor: '#BBBBBB' }}>
            Telem Fault 73647 created 12/3
          </div>
          <p />
          <div style={{ height: '28px', lineHeight: '28px', borderWidth: 1, borderStyle: 'solid', backgroundColor: orange400, textAlign: 'center', color: 'white', borderColor: '#BBBBBB' }}>
            Autom. Reminder: Daily 06:00
          </div>
          <p />
          <div style={{ height: '28px', lineHeight: '28px', borderWidth: 1, borderStyle: 'solid', backgroundColor: '#FFFFFF', textAlign: 'center', color: '#000000', borderColor: '#BBBBBB' }}>
            Add intern comms list
          </div>
        </div>
      </Paper >
    );
  }
}


export default GenericWidget;
