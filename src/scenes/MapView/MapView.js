import React from 'react';
import './MapView.css'
import { AgGridReact } from 'ag-grid-react';
import "../../../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../../../node_modules/ag-grid/dist/styles/ag-theme-balham.css";

class MapView extends React.Component {
    state = {
        selectedTerminals: [],
        selectedCustomers: []
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.resize)

        window.initPTV();
        this.map = window.drawMap([54.505, -0.09], 6);
        this.terminalMarkers = [];
        this.customerMarkers = [];
        this.routes = [];
    }

    convertLocation = (location) => {
        let negative = location < 0;
        location = Math.abs(location);

        let locationString = location.toString();
        locationString = "000000" + locationString;

        let degrees = locationString.substring(0, locationString.length - 4);
        let minutes = locationString.substring(locationString.length - 4, locationString.length - 4 + 2);
        let seconds = locationString.substring(locationString.length - 2, locationString.length - 2 + 2);

        let locationDecimal = parseInt(degrees, 10) + parseInt(minutes, 10) / 60 + parseInt(seconds, 10) / 3600;
        if (negative) {
            locationDecimal = -locationDecimal;
        }
        return locationDecimal;
    };

    position = (terminal) => {
        let latitude = this.convertLocation(terminal.Latitude);
        let longitude = this.convertLocation(terminal.Longitude);

        return [latitude, longitude];
    };

    createTerminalColumns = () => {
        return [
            { headerName: "Name", field: "Name", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, rowDrag: true },
            { headerName: "City", field: "City", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" } },
            { headerName: "Country", field: "CountryCode", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" } },
        ];
    }

    createCustomerColumns = () => {
        return [
            { headerName: "Name", field: "Name", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" }, rowDrag: true },
            { headerName: "City", field: "City", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" } },
            { headerName: "Country", field: "State", filter: 'agTextColumnFilter', cellStyle: { textAlign: "left" } },
        ];
    }

    resize = () => {
        try {
            this.forceUpdate()
        } catch (e) {
            console.log(e);
        }
    }

    onRowDragEnter = (e) => {
        console.log("onRowDragEnter", e);
    }
    onRowDragEnd = (e) => {
        console.log("onRowDragEnd", e);
    }
    onRowDragMove = (e) => {
        console.log("onRowDragMove", e);
    }
    onRowDragLeave = (e) => {
        console.log("onRowDragLeave", e);
    }


    dragover_handler = (e) => {
        console.log("dragover_handler", e);

        e.preventDefault();
        // Set the dropEffect to move
        e.dataTransfer.dropEffect = "move"
    }

    drop_handler = (e) => {
        console.log("drop_handler", e);
    }

    dragstart_handler = (e) => {
        console.log("dragStart");

        e.dataTransfer.setData("text/plain", e.target.id);
    }

    onTerminalGridReady(params) {
        this.gridTerminalApi = params.api;
        this.columnTerminalApi = params.columnApi;
    }

    onTerminalSelectionChanged = () => {
        this.terminalMarkers.forEach((marker) => {
            window.deleteMapMarker(this.map, marker);
        });

        this.terminalMarkers = [];

        let positions = [];
        this.gridTerminalApi.getSelectedRows().forEach((terminal) => {
            this.terminalMarkers.push(window.drawMapColoredMarker(this.map, this.position(terminal), "<b>Terminal</b><br/>" + terminal.Name + "<br/>" + terminal.City, "blue"));
            positions.push(this.position(terminal));
        });

        window.zoomToMarker(this.map, this.terminalMarkers.concat(this.customerMarkers));
    }

    onTerminalGridSizeChanged = (params) => {
        params.api.sizeColumnsToFit();
    }

    onCustomerGridReady(params) {
        this.gridCustomerApi = params.api;
        this.columnCustomerApi = params.columnApi;
    }

    onCustomerSelectionChanged = () => {
        this.customerMarkers.forEach((marker) => {
            window.deleteMapMarker(this.map, marker);
        });

        this.customerMarkers = [];

        this.gridCustomerApi.getSelectedRows().forEach((customer) => {
            this.customerMarkers.push(window.drawMapColoredMarker(this.map, this.position(customer), "<b>Customer</b><br/>" + customer.Name + "<br/>" + customer.City, "red"));
        });

        window.zoomToMarker(this.map, this.terminalMarkers.concat(this.customerMarkers));
    }

    onCustomerGridSizeChanged = (params) => {
        params.api.sizeColumnsToFit();
    }

    routeHandler = () => {
        let positions = [];

        let terminalRows = this.gridTerminalApi.getSelectedRows()
        let customerRows = this.gridCustomerApi.getSelectedRows()

        if ( terminalRows.length >= 1 ) {
            positions.push(this.position(terminalRows[0]));
        }

        customerRows.forEach((customer) => {
            positions.push(this.position(customer));
        });

        this.gridTerminalApi.getSelectedRows().forEach((terminal, index) => {
            if ( index > 0 ) {
                positions.push(this.position(terminal));
            }
        });

        this.routes.push(window.drawRoute(this.map, positions));
    }

    clearHandler = () => {
        this.customerMarkers.forEach((marker) => {
            window.deleteMapMarker(this.map, marker);
        });

        this.terminalMarkers.forEach((marker) => {
            window.deleteMapMarker(this.map, marker);
        });

        this.routes.forEach((route) => {
            window.deleteMapRoute(this.map, route[0]);
            window.deleteMapRoute(this.map, route[1]);
        });

        this.gridTerminalApi.deselectAll();
        this.gridCustomerApi.deselectAll();
    }


    render() {
        let containerStyle = {
            height: '100px',
            width: '100%',
        };

        let leftStyle = {
            height: '100px',
            width: '30%',
            float: "left",
        };

        let rightStyle = {
            height: '100px',
            width: '70%',
            float: "right",
        };

        let spacerStyle = {
            height: '50px',
            width: '100%',
            fontSize: 10
        };

        let terminalStyle = {
            height: '100px',
            width: '100%',
        };

        let customerStyle = {
            height: '100px',
            width: '100%',
        };

        containerStyle.height = String(window.innerHeight - 120) + 'px';
        leftStyle.height = String(window.innerHeight - 120) + 'px';
        rightStyle.height = String(window.innerHeight - 120) + 'px';

        terminalStyle.height = String((window.innerHeight - 80) / 2 - 45) + 'px';
        customerStyle.height = String((window.innerHeight - 80) / 2 - 45) + 'px';

        return (
            <div>
                <div style={containerStyle}>

                    <div style={leftStyle}>

                        <div style={terminalStyle} className="ag-theme-balham">
                            <AgGridReact
                                columnDefs={this.createTerminalColumns()}
                                rowData={this.props.terminals}
                                enableFilter={true}
                                enableColResize={true}
                                enableSorting={true}
                                floatingFilter={true}
                                rowSelection='multiple'
                                onGridReady={this.onTerminalGridReady.bind(this)}
                                onRowDragEnter={this.onRowDragEnter.bind(this)}
                                onRowDragEnd={this.onRowDragEnd.bind(this)}
                                onRowDragMove={this.onRowDragMove.bind(this)}
                                onRowDragLeave={this.onRowDragLeave.bind(this)}
                                onSelectionChanged={this.onTerminalSelectionChanged.bind(this)}
                                onGridSizeChanged={this.onTerminalGridSizeChanged.bind(this)}

                                onColumnVisible={this.filterChanged}>
                            </AgGridReact>
                        </div>
                        <div style={spacerStyle}>
                            <br />
                            <button onClick={this.routeHandler}>ROUTE</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={this.clearHandler}>CLEAR</button>
                        </div>
                        <div style={customerStyle} className="ag-theme-balham">
                            <AgGridReact
                                columnDefs={this.createCustomerColumns()}
                                rowData={this.props.customers}
                                enableFilter={true}
                                enableColResize={true}
                                enableSorting={true}
                                floatingFilter={true}
                                rowSelection='multiple'
                                onGridReady={this.onCustomerGridReady.bind(this)}
                                onRowDragEnter={this.onRowDragEnter.bind(this)}
                                onRowDragEnd={this.onRowDragEnd.bind(this)}
                                onRowDragMove={this.onRowDragMove.bind(this)}
                                onRowDragLeave={this.onRowDragLeave.bind(this)}
                                onSelectionChanged={this.onCustomerSelectionChanged.bind(this)}
                                onGridSizeChanged={this.onCustomerGridSizeChanged.bind(this)}

                                onColumnVisible={this.filterChanged}>

                            </AgGridReact>
                        </div>

                    </div>

                    <div style={rightStyle}>
                        <div id="map2" />
                    </div>
                </div>
            </div>
        )
    }
}

export default MapView;