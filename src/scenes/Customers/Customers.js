import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Customers.css'
import {
  getCustomerData
} from '../../modules/customer/customerAction';
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

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.props.customerActions.getCustomerData();
    this.props.listViewActions.getSavedViewOptions('Customer');
    this.props.listViewActions.getSavedFilterOptions('Customer');
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
      <div className="customers">
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
          listViewType="Customer"
        />
      </div>
    )
  }
}


export default connect(
  state => ({
    listViewHeaders: state.customer.customerHeaders,
    listViewRowData: state.customer.customers,
    savedViewOptions: state.listView.chosenViewOptions,
    chosenViewOption: state.listView.chosenViewOption,
    savedFilterOptions: state.listView.chosenFilterOptions,
    chosenFilterOption: state.listView.chosenFilterOption
  }),
  dispatch => ({
    customerActions: bindActionCreators({
        getCustomerData
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
)(Customers);
