import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50, grey300, grey800 } from 'material-ui/styles/colors';

import { AgGridReact } from 'ag-grid-react';
import "../../../../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../../../../node_modules/ag-grid/dist/styles/ag-theme-balham.css";

import Checkbox from 'material-ui/Checkbox';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';

class InteractionLogWidget extends React.Component {

  gridData = [
    { "Date": "18/05/2016", "Category": "DW", "Subject": "Contacted to request a delivery", "FollowUp": "X", "Done": "X", },
    { "Date": "16/04/2016", "Category": "Partial", "Subject": "Customer informed about partial delivery", "FollowUp": "", "Done": "X", },
    { "Date": "12/04/2016", "Category": "POD", "Subject": "POD Requested for delivery", "FollowUp": "X", "Done": "X", },
    { "Date": "09/03/2016", "Category": "PS", "Subject": "Checked BH Usage", "FollowUp": "", "Done": "X", },
    { "Date": "06/03/2016", "Category": "DW", "Subject": "Contacted to request a delivery", "FollowUp": "X", "Done": "", },
  ];

  createColumns = () => {
    return [
      { headerName: "Date", field: "Date", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 80 },
      { headerName: "Category", field: "Category", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 70 },
      { headerName: "Subject", field: "Subject", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 200 },
      { headerName: "Follow up", field: "FollowUp", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 70 },
      { headerName: "Done", field: "Done", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 60 },
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  resize = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  filterChanged(params) {
    console.log("Filter Changed")
    var allColumnIds = [];
    this.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.columnApi.autoSizeColumns(allColumnIds);
  }

  showFilterHandler = (event, isInputChecked) => {
    this.gridApi.gridCore.gridOptions.floatingFilter = isInputChecked;
    this.gridApi.refreshHeader();
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
        padding: 2,
        height: '18px'
      },
      widgetBody: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        height: 100
      },
      gridStyle: {
        height: this.props.height - 20,
        width: '100%',
      },
      checkbox: {
        marginTop: '-2px',
        marginBottom: 0,
      }
    };

    return (

      <Paper style={styles.paper}>
        <div style={{ ...styles.widgetHeader }}>

          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">

              <Checkbox iconStyle={{ fill: '#333333' }}
                checkedIcon={<ExpandMore />}
                uncheckedIcon={<ExpandLess />}
                style={styles.checkbox}
                onCheck={this.showFilterHandler.bind(this)}
              />

            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              Interaction Log
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            </div>
          </div>
        </div>
        <div style={styles.widgetBody}>
          <div style={styles.gridStyle} className="ag-theme-balham">
            <AgGridReact
              columnDefs={this.createColumns()}
              rowData={this.gridData}
              enableFilter={true}
              enableColResize={true}
              enableSorting={true}
              floatingFilter={false}
              rowSelection='single'
              toolPanelSuppressRowGroups={true}
              toolPanelSuppressPivots={true}
              toolPanelSuppressValues={true}
              toolPanelSuppressPivotMode={true}
              rowHeight={24.5}

              onGridSizeChanged={(params) => {
                params.api.sizeColumnsToFit();
              }}

              onGridReady={this.onGridReady.bind(this)}

              onColumnVisible={this.filterChanged}>

            </AgGridReact>
          </div>
        </div>
      </Paper>

    );
  }
}

export default InteractionLogWidget;
