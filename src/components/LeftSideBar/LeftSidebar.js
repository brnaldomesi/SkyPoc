import React from 'react'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import logo from './images/logo.png'
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }
  handleMenuItemClick(url) {
    this.props.redirectToUrl(url);
  }
  render() {
    return(
      <Drawer open={this.props.isLeftSidebarOpen}>
        <img src={logo} alt='Air Products green logo' className="APLogo"/>
        <p/>
        <div className="MenuItems">
          <MenuItem primaryText="Customers" rightIcon={<ArrowDropRight />} onClick={()=>{this.handleMenuItemClick('/customers')}}/>
          <MenuItem primaryText="Terminals" rightIcon={<ArrowDropRight />} onClick={()=>{this.handleMenuItemClick('/terminals')}}/>
          <MenuItem primaryText="Sources" rightIcon={<ArrowDropRight />} onClick={()=>{this.handleMenuItemClick('/sources')}}/>
          <MenuItem primaryText="Drivers" rightIcon={<ArrowDropRight />} onClick={()=>{this.handleMenuItemClick('/drivers')}}/>
          <MenuItem primaryText="Equipment" rightIcon={<ArrowDropRight />} onClick={()=>{this.handleMenuItemClick('/equipments')}}/>
          <Divider />
          <MenuItem primaryText="Trips" rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="Demand" rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="Complaints" rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="Follow-Ups" rightIcon={<ArrowDropRight />} />
          <Divider />
          <MenuItem primaryText="Customer Dashboard" rightIcon={<ArrowDropRight />} onClick={()=>{this.handleMenuItemClick('/customerDashboard')}}/>
          <MenuItem primaryText="Map" rightIcon={<ArrowDropRight />} onClick={()=>{this.handleMenuItemClick('/mapView')}}/>
          <Divider />
          <MenuItem primaryText="Customer Letters" rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="Point To Point" rightIcon={<ArrowDropRight />} />
          <Divider />
          <MenuItem
            primaryText="Reports"
            primaryTogglesNestedList={true}
            nestedItems={[
              <MenuItem key="MIAudit" primaryText="Audit" rightIcon={<ArrowDropRight />} />,
              <MenuItem key="MIComplaints" primaryText="Complaints" rightIcon={<ArrowDropRight />} />,
              <MenuItem key="MIFollowups" primaryText="Follow ups" rightIcon={<ArrowDropRight />} />,
              <MenuItem key="MIMonitoring" primaryText="Monitoring" rightIcon={<ArrowDropRight />} />,
              <MenuItem key="MIMessaging" primaryText="Messaging" rightIcon={<ArrowDropRight />} />,
              <MenuItem key="MIPickupup" primaryText="Pickup up" rightIcon={<ArrowDropRight />} />
            ]}
          />
          <Divider />
          <MenuItem
            primaryText="Admin"
            primaryTogglesNestedList={true}
            nestedItems={[
              <MenuItem key="MIAddUser" primaryText="Add User" rightIcon={<ArrowDropRight />} />,
              <MenuItem key="MISecurityRoles" primaryText="Security Roles" rightIcon={<ArrowDropRight />} />,
              <MenuItem key="MIConfiguration" primaryText="Configuration" rightIcon={<ArrowDropRight />} />,
            ]}
          />

        </div>
        {this.props.children}
      </Drawer>
    );
  }

}

export default connect(
  state => ({ isLeftSidebarOpen: state.leftSidebar.isLeftSidebarOpen}),
  (dispatch) => ({
    redirectToUrl:(url) => {
      dispatch(push(url));
    }
  })
)(LeftSidebar);