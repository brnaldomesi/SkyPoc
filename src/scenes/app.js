import React from 'react';
import { connect } from "react-redux";
import { Route} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftSidebar from '../components/LeftSideBar/LeftSidebar'
import Header from '../components/Header/Header';
import Customers from './Customers/Customers';
import Terminals from './Terminals/Terminals';
import CustomerDashboard from './CustomerDashboard/CustomerDashboard';
import MapView from './MapView/MapView';

class App extends React.Component {
  render() {
    const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };

    if (this.props.isLeftSidebarOpen) {
      contentStyle.marginLeft = 262;
    } else {
      contentStyle.marginLeft = 0;
    }

    return(
      <MuiThemeProvider>
        <div className="App">
          <LeftSidebar/>
          <div style={contentStyle}>
            <Header/>
            <Route exact path="/" component={Customers} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/terminals" component={Terminals} />
            <Route exact path="/customerDashboard" component={CustomerDashboard} />
            <Route exact path="/mapView" component={MapView} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}


export default connect(
  state => ({ isLeftSidebarOpen: state.leftSidebar.isLeftSidebarOpen}),
  null
)(App);