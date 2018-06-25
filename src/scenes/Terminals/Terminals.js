import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Terminals.css'
import { getTerminalData }from '../../modules/terminal/terminalAction';
import ListView from '../components/ListView/ListView';
import {
  changeViewOption,
  addSavedViewOption,
  getSavedViewOptions,
  removeSavedViewOption,
  addSavedFilterOption,
  getSavedFilterOptions,
  changeFilterOption,
  removeSavedFilterOption
} from '../components/ListView/ListViewAction';

class Terminals extends React.Component {
  constructor(props) {
    super(props);
    this.props.terminalActions.getTerminalData();
    this.props.listViewActions.getSavedViewOptions('Terminal');
    this.props.listViewActions.getSavedFilterOptions('Terminal');
  }

  render() {
    const {
      listViewHeaders,
      listViewRowData,
      savedViewOptions,
      chosenViewOption,
      savedFilterOptions,
      chosenFilterOption
    } = this.props;
    return(
      <div className="terminals">
        <ListView
          handleViewSelectChange={(optionName) => { this.props.listViewActions.changeViewOption(optionName); }}
          handleSaveViewClick={(viewOption) => { this.props.listViewActions.addSavedViewOption(viewOption); }}
          handleRemoveSavedViewOption={(optionName) => {this.props.listViewActions.removeSavedViewOption(optionName); }}
          handleFilterSelectChange={(optionName) => {this.props.listViewActions.changeFilterOption(optionName); }}
          handleSaveFilterClick={(filterOption) =>{ this.props.listViewActions.addSavedFilterOption(filterOption); }}
          handleRemoveSavedFilterOption={(optionName) => {this.props.listViewActions.removeSavedFilterOption(optionName); }}
          listViewHeaders = {listViewHeaders}
          listViewRowData = {listViewRowData}
          savedViewOptions={savedViewOptions}
          chosenViewOption={chosenViewOption}
          savedFilterOptions={savedFilterOptions}
          chosenFilterOption={chosenFilterOption}
          listViewType="Terminal"
        />
      </div>
    )
  }
}
export default connect(
  state => ({
    listViewHeaders: state.terminal.terminalHeaders,
    listViewRowData: state.terminal.terminals,
    savedViewOptions: state.listView.chosenViewOptions,
    chosenViewOption: state.listView.chosenViewOption,
    savedFilterOptions: state.listView.chosenFilterOptions,
    chosenFilterOption: state.listView.chosenFilterOption
  }),
  dispatch => ({
    terminalActions: bindActionCreators(
      {
        getTerminalData
      },
      dispatch
    ),
    listViewActions: bindActionCreators({
      changeViewOption,
      addSavedViewOption,
      getSavedViewOptions,
      removeSavedViewOption,
      addSavedFilterOption,
      getSavedFilterOptions,
      changeFilterOption,
      removeSavedFilterOption
    }, dispatch)
  })
)(Terminals);