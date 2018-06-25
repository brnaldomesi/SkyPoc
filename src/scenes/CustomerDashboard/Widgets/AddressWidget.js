import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50, grey300, grey800 } from 'material-ui/styles/colors';

class AddressWidget extends React.Component {

  render() {

    const styles = {
      paper: {
        marginTop: this.props.marginTop,
        backgroundColor: grey50,
        height: this.props.height
      },
      widgetHeader: {
        color: grey800,
        backgroundColor: grey300,
        padding: 2
      },
      widgetBody: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%',
        height: 75,
        textAlign: 'left',
        fontSize: '14px'
      },
      dashGraphics: {
        marginTop: 15        
      }
    };

    return (
      <Paper style={styles.paper}>
        <div style={{ ...styles.widgetHeader }}>
          OSI Food Solutions - 712760&nbsp;&nbsp;&nbsp;FORCAST&nbsp;&nbsp;&nbsp;OSISCUN&nbsp;&nbsp;&nbsp;<b>LIN</b>
        </div>
        <div style={styles.widgetBody}>
        <div style={{ fontSize: 8 }}>
            <br />
          </div>

          <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-8">
              25 LUNEBURG WAY<br />
              DN15 8LP SCUNTHORP&nbsp;&nbsp;GB<br />
              <br />
              RED LINE<br />
              157 kms from terminal (U55)<br />
              61795kg Capacity<br />
            </div>

            <div style={styles.dashGraphics} className="col-xs-12 col-sm-6 col-md-6 col-lg-4">             
              <img src='./assets/Images/CustomerDashGraphics.png' alt=''></img>        
            </div>
          </div>
        </div>
      </Paper>
    );
  }


}

export default AddressWidget;
