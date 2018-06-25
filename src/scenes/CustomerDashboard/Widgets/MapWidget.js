import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50, grey300, grey800 } from 'material-ui/styles/colors';

class MapWidget extends React.Component {

  componentDidMount() {
    window.initPTV();
    let position = [53.604880, -0.677779];
    this.map = window.drawMap(position, 14);
    window.drawMapMarker(this.map, position);
  }

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
        width: '100%',
        height: 125
      }
    };

    return (
      <Paper style={styles.paper}>
        <div style={styles.widgetBody}>

          <div id="map2" />

        </div>
      </Paper>
    );
  }
}

export default MapWidget;
