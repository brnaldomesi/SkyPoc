import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50 } from 'material-ui/styles/colors';

class ProductionScheduleWidget extends React.Component {

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
              <tr style={{ fontSize: 13.5, padding: 1 }}><td></td><td><b>&nbsp;00:00-06:00&nbsp;</b></td><td><b>&nbsp;06:00-22:00&nbsp;</b></td><td><b>&nbsp;22:00-24:00&nbsp;</b></td></tr>
              <tr><td>&nbsp;Mon&nbsp;</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td></tr>
              <tr><td>&nbsp;Tue&nbsp;</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td></tr>
              <tr><td>&nbsp;Wed&nbsp;</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td></tr>
              <tr><td>&nbsp;Thu&nbsp;</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td></tr>
              <tr><td>&nbsp;Fri&nbsp;</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td></tr>
              <tr><td>&nbsp;Sat&nbsp;</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td></tr>
              <tr><td>&nbsp;Sun&nbsp;</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td><td>50%<br />5000kg</td></tr>
            </tbody>
          </table>
        </div>
      </Paper>
    );
  }
}


export default ProductionScheduleWidget;
