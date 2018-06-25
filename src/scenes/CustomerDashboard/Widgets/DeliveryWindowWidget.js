import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50 } from 'material-ui/styles/colors';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { blue300 } from 'material-ui/styles/colors';

class DeliveryWindowWidget extends React.Component {

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
        textAlign: 'center',
        fontSize: '14px',
        padding: 6
      },
      tableStyle: {
        borderCollapse: 'collapse'
      },
      lowerSection: {
        textAlign: 'left'
      }
    };

    return (
      <Paper style={styles.paper}>
        <div style={styles.widgetBody}>
        <div style={{ fontSize: 8 }}>
            <br />
          </div>
          <table style={styles.tableStyle} border="1" align='center' width="90%">
            <tbody>
              <tr><td></td><td><b>From</b></td><td><b>To</b></td></tr>
              <tr><td>&nbsp;Mon&nbsp;</td><td>6:00</td><td>22:00</td></tr>
              <tr><td>&nbsp;Tue&nbsp;</td><td>6:00</td><td>22:00</td></tr>
              <tr><td>&nbsp;Wed&nbsp;</td><td>6:00</td><td>22:00</td></tr>
              <tr><td>&nbsp;Thu&nbsp;</td><td>6:00</td><td>22:00</td></tr>
              <tr><td>&nbsp;Fri&nbsp;</td><td>6:00</td><td>22:00</td></tr>
              <tr><td>&nbsp;Sat&nbsp;</td><td>6:00</td><td>22:00</td></tr>
              <tr><td>&nbsp;Sun&nbsp;</td><td>6:00</td><td>22:00</td></tr>
            </tbody>
          </table>
          <br />
          <div style={styles.lowerSection}>
            <Checkbox
              style={styles.checkbox}
              label='Accepts outside DW if inform.' />
            <br />
            Status:&nbsp;&nbsp;&nbsp;
            <select name='Status'>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <RaisedButton label="Audit" backgroundColor={blue300} labelColor='#FFFFFF' fullWidth={false} />
          </div>
        </div>
      </Paper>
    );
  }
}


export default DeliveryWindowWidget;
