import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50 } from 'material-ui/styles/colors';
import { indigo500 } from 'material-ui/styles/colors';
import { LineChart, ReferenceLine, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


class ReadingsGraphWidget extends React.Component {

  graphData = [
    { readingDate: '1/1/2018', value: 147 },
    { readingDate: '7/1/2018', value: 125 },
    { readingDate: '14/1/2018', value: 110 },
    { readingDate: '21/1/2018', value: 75 },
    { readingDate: '28/1/2018', value: 64 },
    { readingDate: '1/2/2018', value: 30 },
    { readingDate: '7/2/2018', value: 147 },
    { readingDate: '14/2/2018', value: 120 },
    { readingDate: '21/2/2018', value: 100 },
    { readingDate: '23/2/2018', value: 65 },
    { readingDate: '24/2/2018', value: 65 },
    { readingDate: '25/2/2018', value: 65 },
    { readingDate: '26/2/2018', value: 25 },
    { readingDate: '1/3/2018', value: 147 },
    { readingDate: '4/3/2018', value: 125 },
    { readingDate: '8/3/2018', value: 110 },
    { readingDate: '14/3/2018', value: 75 },
    { readingDate: '21/3/2018', value: 40 },
    { readingDate: '28/3/2018', value: 30 },
    { readingDate: '29/03/2018', value: 25 },
    { readingDate: '29/03/2018', value: 147 },
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
        textAlign: 'center'
      }    
    };

    return (
      <Paper style={styles.paper}>
        <div style={styles.widgetBody}>

          <div style={styles.graphDiv}>
            <ResponsiveContainer>
              <LineChart data={this.graphData} margin={{top: 10, right: 20, left: 0, bottom: 0}}>

                <XAxis dataKey="readingDate" stroke="#CCCCCC" ticks={['1/1/2018', '1/2/2018', '1/3/2018']}/>
                <YAxis domain={[0, 175]} stroke="#E0E0E0" ticks={[0, 50, 100, 150]} />

                <Line dot={false} type="monotone" dataKey="value" stroke={indigo500} strokeWidth={2} />

                <ReferenceLine y={150} label="" stroke="#FF0000" />
                <ReferenceLine y={40} label="" stroke="#00DD00" />
                <ReferenceLine y={15} label="" stroke="#0000FF" />

                <Tooltip/> />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Paper>
    );
  }
}

export default ReadingsGraphWidget;
