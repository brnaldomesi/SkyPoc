import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50 } from 'material-ui/styles/colors';
import { green100, green400 } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, ReferenceLine } from 'recharts';


class TankLevelWidget extends React.Component {

  tankData = [
    { readingDate: '1/1/2018', value: 135 },
  ];

  render() {

    const styles = {
      paper: {
        marginTop: this.props.marginTop,
        backgroundColor: grey50,
        height: this.props.height
      },
      widgetBody: {
        textAlign: 'left',
        fontSize: '14px'
      },
      graphDiv: {
        height: this.props.height,
        textAlign: 'center',
        backgroundColor: green100
      },
      infoText: {
        marginLeft: 10,
        textAlign: 'left'
      }
    };

    return (
      <Paper style={styles.paper}>
        <div style={styles.widgetBody}>

          <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-7" style={styles.infoText}>
              <br />
              <b>Est. Target Refill:</b><br />
              3/6/2018<br />
              <br />
              <b>Est. Run Out:</b><br />
              10/6/2018<br />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
              <div style={styles.graphDiv}>
                <ResponsiveContainer>
                  <BarChart data={this.tankData} >
                    <Bar dataKey="value" fill={green400} label={true} />
                    <XAxis dataKey="readingDate" stroke="none" tick={{ fill: white }} hide={true} />
                    <YAxis domain={[0, 160]} hide={true} />

                    <ReferenceLine y={150} label="" stroke="#000000" />
                    <ReferenceLine y={40} label="" stroke="#FFFFFF" />
                    <ReferenceLine y={15} label="" stroke="#FF0000" />

                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default TankLevelWidget;
