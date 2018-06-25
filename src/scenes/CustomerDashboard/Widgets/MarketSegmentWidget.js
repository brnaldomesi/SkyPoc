import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50, cyan800, pink600, deepPurple400, blue500 } from 'material-ui/styles/colors';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

class MarketSegmentWidget extends React.Component {

  chartData = [
    { name: 'On Time Delivery', value: 100, color: cyan800 },
    { name: 'On Time Payment', value: 90, color: pink600 },
    { name: 'Responsive', value: 30, color: deepPurple400 },
    { name: 'Satisfaction', value: 40, color: blue500 },
  ];

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
      },
      pieChartDiv: {
        height: 125,
        textAlign: 'center'
      },
      infoText: {
        textAlign: 'left'
      }
    };

    return (
      <Paper style={styles.paper}>
        <div style={styles.widgetBody}>
          <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
              <div style={styles.pieChartDiv}>
                <ResponsiveContainer>
                  <PieChart >
                    <Pie
                      innerRadius={30}
                      outerRadius={50}
                      data={this.chartData}
                      dataKey='value'
                      fill="#8884d8">
                      {
                        this.chartData.map((item) => <Cell key={item.name} fill={item.color} />)
                      }
                      <Label width={30} position="center" fontSize="28">
                        {"65"}
                      </Label>
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-7" style={styles.infoText}>
              <br/>
              Market Segment: FOOD<br/>
              Food Freezing<br/>
              <br/>
              <b>Potential Impact:</b><br/>
              Loss batch of meat
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default MarketSegmentWidget;
