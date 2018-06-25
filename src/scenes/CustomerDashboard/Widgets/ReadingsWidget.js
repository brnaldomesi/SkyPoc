import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50, grey300, grey800 } from 'material-ui/styles/colors';

import { AgGridReact } from 'ag-grid-react';
import "../../../../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../../../../node_modules/ag-grid/dist/styles/ag-theme-balham.css";

import Checkbox from 'material-ui/Checkbox';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';

class ReadingsWidget extends React.Component {

  gridData = [
    { type: "Driver After Reading", readingDate: '29/3/2018', value: 147 },
    { type: "Driver Before Reading", readingDate: '29/3/2018', value: 25 },
    { type: "Telemetry", readingDate: '28/3/2018', value: 30 },
    { type: "Telemetry", readingDate: '21/3/2018', value: 40 },
    { type: "Telemetry", readingDate: '14/3/2018', value: 75 },
    { type: "Telemetry", readingDate: '8/3/2018', value: 110 },
    { type: "Telemetry", readingDate: '4/3/2018', value: 125 },
    { type: "Driver After Reading", readingDate: '1/3/2018', value: 147 },
    { type: "Driver Before Reading", readingDate: '26/2/2018', value: 25 },
    { type: "Telemetry", readingDate: '25/2/2018', value: 65 },
    { type: "Telemetry", readingDate: '24/2/2018', value: 65 },
    { type: "Telemetry", readingDate: '23/2/2018', value: 65 },
    { type: "Telemetry", readingDate: '21/2/2018', value: 100 },
    { type: "Telemetry", readingDate: '14/2/2018', value: 120 },
    { type: "Driver After Reading", readingDate: '1/1/2018', value: 147 },
    { type: "Driver Before Reading", readingDate: '1/2/2018', value: 30 },
    { type: "Telemetry", readingDate: '28/1/2018', value: 64 },
    { type: "Telemetry", readingDate: '21/1/2018', value: 75 },
    { type: "Telemetry", readingDate: '14/1/2018', value: 110 },
    { type: "Telemetry", readingDate: '7/1/2018', value: 125 },
    { type: "Driver After Reading", readingDate: '1/1/2018', value: 147 },
  ];

  createColumns = () => {
    return [
      { headerName: "Type", field: "type", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 120 },
      { headerName: "Level", field: "value", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 55 },
      { headerName: "Date", field: "readingDate", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 75 },
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
              Readings
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

export default ReadingsWidget;
