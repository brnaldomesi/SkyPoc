import React from 'react';
import Paper from 'material-ui/Paper';
import { grey50, grey300, grey800 } from 'material-ui/styles/colors';

import { AgGridReact } from 'ag-grid-react';
import "../../../../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../../../../node_modules/ag-grid/dist/styles/ag-theme-balham.css";

import Checkbox from 'material-ui/Checkbox';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';

class PreviousDeliveryWidget extends React.Component {

  gridData = [
    { "DN": "805123554", "Date": "01/04/2016", "Time": "14h25", "Volume": "22154kg", ReadingBefore: "41", ReadingAfter: "260" },
    { "DN": "805123265", "Date": "14/03/2016", "Time": "13h32", "Volume": "21235kg", ReadingBefore: "39", ReadingAfter: "259" },
    { "DN": "805126364", "Date": "03/03/2016", "Time": "11h54", "Volume": "20426kg", ReadingBefore: "36", ReadingAfter: "261" },
    { "DN": "805127426", "Date": "15/02/2016", "Time": "10h23", "Volume": "22826kg", ReadingBefore: "29", ReadingAfter: "258" },
    { "DN": "805128435", "Date": "04/02/2016", "Time": "18h22", "Volume": "22133kg", ReadingBefore: "37", ReadingAfter: "257" },
  ];

  createColumns = () => {
    return [
      { headerName: "DN", field: "DN", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
      { headerName: "Date", field: "Date", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
      { headerName: "Time", field: "Time", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 110 },
      { headerName: "Volume", field: "Volume", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 110 },
      { headerName: "Before", field: "ReadingBefore", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
      { headerName: "After", field: "ReadingAfter", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, width: 140 },
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
              Previous Deliveries
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

export default PreviousDeliveryWidget;
