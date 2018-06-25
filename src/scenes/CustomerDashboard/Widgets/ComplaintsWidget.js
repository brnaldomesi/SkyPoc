import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50, grey300, grey800 } from 'material-ui/styles/colors';

import { AgGridReact } from 'ag-grid-react';
import "../../../../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../../../../node_modules/ag-grid/dist/styles/ag-theme-balham.css";

import Checkbox from 'material-ui/Checkbox';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';

class ComplaintsWidget extends React.Component {

  gridData = [
    { "RefNr": "534342324", "Category": "Runout", Status: "Open", "Created": "18/04/2016", "Closed": "19/04/2016" },
    { "RefNr": "534325354", "Category": "Late Delivery", Status: "Closed", "Created": "13/02/2016", "Closed": "14/02/2016" },
    { "RefNr": "534314397", "Category": "Runout", Status: "Closed", "Created": "23/12/2015", "Closed": "23/12/2015" },
  ];

  createColumns = () => {
    return [
      { headerName: "Ref Nr.", field: "RefNr", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
      { headerName: "Category", field: "Category", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
      { headerName: "Status", field: "Status", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
      { headerName: "Created", field: "Created", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
      { headerName: "Closed", field: "Closed", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
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
              Complaints
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

export default ComplaintsWidget;
