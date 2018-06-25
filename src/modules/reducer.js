import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import leftSidebarReducer from '../components/LeftSideBar/LeftSidebarReducer';
import customerReducer from './customer/customerReducer';
import terminalReducer from './terminal/terminalReducer';
import listViewReducer from '../scenes/components/ListView/ListViewReducer';

export default combineReducers({
  routing: routerReducer,
  leftSidebar: leftSidebarReducer,
  customer: customerReducer,
  terminal: terminalReducer,
  listView: listViewReducer
});
