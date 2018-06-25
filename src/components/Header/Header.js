import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { toggleLeftSidebar } from '../LeftSideBar/LeftSidebarAction';
import './Header.css'

const TopRightMenu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.onToggleSidebarClick = this.onToggleSidebarClick.bind(this);
  }
  onToggleSidebarClick() {
    this.props.leftSidebarActions.toggleLeftSidebar();
  }

  render() {
    return(
      <AppBar
        title="Sky Logistics Planner"
        className="header"
        onLeftIconButtonClick={ this.onToggleSidebarClick }
        iconElementRight={
          <div>
            <div className='topBarRightText'>
              Swathi, Nimmakayala
            </div>
            {<TopRightMenu/>}
          </div>
        }
      />
    );
  }
}

export default connect(
  null,
  dispatch => ({
    leftSidebarActions: bindActionCreators(
      {
        toggleLeftSidebar
      },
      dispatch
    )
  })
)(Header);