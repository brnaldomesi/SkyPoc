import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Jumbotron, Container, Input } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import FaFilter from 'react-icons/lib/fa/filter';
import { Collapse } from 'react-collapse';
import { AgGridReact } from 'ag-grid-react';
import DateFilterField from './components/DateFilterField';
import "../../../../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../../../../node_modules/ag-grid/dist/styles/theme-fresh.css";
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import './ListView.css';
import $ from "jquery";

const listViewConditions = [
  {value:"is",label:"is"}, 
  {value:"isnot",label:"is not"},
  {value:"isempty",label:"is empty"},
  {value:"isnotemtpy",label:"is not empty"},
  {value:"startswith",label:"starts with"},
  {value:"endswith",label:"ends with"},
  {value:"contains",label:"contains"},
  {value:"doesnotcontain",label:"does not contain"},
  {value:"isanything",label:"is anything"},
  {value:"issameas",label:"is same as"},
  {value:"isdifferentfrom",label:"is different from"},
  {value:"isemptystring",label:"isemptystring"}
];

const dateTypeHeaderFields = [
  'DlvryDate',
  'DriverInspDate',
  'EstDlvryDate',
  'FirstFillDate',
  'NextInspDateFrom',
  'NextInspDateTo',
  'OrderDueDate',
  'OrderDueDateWoDlvry',
  'PremoRunOutDate',
  'TankChangeOutDate',
  'UnloadTime'
];

const buildDateConditions = (conditions = [], condition, value, condValue, condValue2) => {
  let condDate = condValue ? condValue.date : null;
  let condDate2 = condValue2 ? condValue2.date : null;

  const condLabel = condValue ? condValue.label : null;
  const condLabel2 = condValue2 ? condValue2.label : null;


  let condMoment = null
  let condMoment2 = null

  if(condDate != null){
    if(typeof(condDate) === "string")
      condDate = moment(condDate)
    const formated_condType = condDate.format('YYYY-MM-DD HH:mm')
    condMoment = moment(formated_condType)
  }

  if(condDate2 != null) {
    if(typeof(condDate2) === "string")
      condDate2 = moment(condDate2)
    const formated_condType2 = condDate2.format('YYYY-MM-DD HH:mm')
    condMoment2 = moment(formated_condType2)
  }

  const formatedType = moment(value).format('YYYY-MM-DD HH:mm')
  const valueMoment = moment(formatedType)

  switch (condition) {
    case 'on':
      conditions.push(valueMoment.isSame(condMoment));
      break;
    case 'not_on':
      conditions.push(!valueMoment.isSame(condMoment));
      break;
    case 'before':
      conditions.push(valueMoment.isBefore(condMoment));
      break;
    case 'at_or_before':
      conditions.push(valueMoment.isSameOrBefore(condMoment));
      break;
    case 'after':
      conditions.push(valueMoment.isAfter(condMoment));
      break;
    case 'at_or_after':
      conditions.push(valueMoment.isSameOrAfter(condMoment));
      break;
    case 'between':
      conditions.push(valueMoment.isBetween(condMoment, condMoment2));
      break;
    case 'is_empty':
      conditions.push(!value);
      break;
    case 'is_anything':
      conditions.push(1);
      break;
    default:
      conditions.push(1);
      break;
  }
  return conditions;
};

const buildConditions = (conditions = [], condition, value, condValue) => {
  if(condition == 'is')
    conditions.push(value === condValue);
  else if(condition == 'isnot')
    conditions.push(value !== condValue);
  else if(condition === 'isempty')
    conditions.push(!value);
  else if(condition === 'isnotemtpy')
    conditions.push(value !== '');
  else if(condition === 'startswith')
    conditions.push(value.startsWith(condValue));
  else if(condition === 'endswith')
    conditions.push(value.endsWith(condValue));
  else if(condition === 'contains')
    conditions.push(value.indexOf(condValue) !== -1);
  else if(condition === 'doesnotcontain')
    conditions.push(!(value.indexOf(condValue) !== -1));
  else if(condition === 'isanything')
    conditions.push(1);
  else if(condition === 'issameas')
    conditions.push(value === condValue);
  else if(condition === 'isdifferentfrom')
    conditions.push(value !== condValue);
  else if(condition === 'isemptystring')
    conditions.push(!value);
  return conditions;
};

class ListView extends React.Component {
  constructor(props) {
    super(props);
    let filterData = null
    let filterMode = 1

    if(this.props.chosenFilterOption !== null && typeof this.props.chosenFilterOption !== 'undefined') {
      filterData = this.props.chosenFilterOption.filterData;
      filterMode = this.props.chosenFilterOption.filterMode;
    }

    this.state = {
      isRedrawTable: true,
      isShowFilter: false,
      isShowViewAddButton: false,
      isShowFilterAddButton: false,
      isShowAddViewModal: false,
      isShowAddFilterModal: false,
      ands: filterData==null?[]:filterData.ands,
      elements: filterData==null?[]:filterData.elements,
      selected: filterData==null?[]:filterData.selected,
      values: filterData==null?[]:filterData.values,
      conditions: filterData==null?[]:filterData.conditions,
      listViewRowData: this.props.listViewRowData,
      savedViewOptions: this.props.savedViewOptions,
      savedFilterOptions: this.props.savedFilterOptions,
      chosenViewOption: this.props.chosenViewOption,
      listViewType: this.props.listViewType,
      filterMode: filterMode,
      isFilterNavigated: false,
      isViewNavigated: false
    };

    this.refViewSelect = null;
    this.refViewAddButton = null;
    this.refFilterSelect = null;
    this.refFilterAddButton = null;
    
    this.toggleFilter = this.toggleFilter.bind(this);

    // View Select Event Listeners
    this.handleViewSelectChange = this.handleViewSelectChange.bind(this);
    this.handleViewSelectOpen = this.handleViewSelectOpen.bind(this);
    this.handleViewSelectClose = this.handleViewSelectClose.bind(this);
    this.handleViewSelectAddButtonClick = this.handleViewSelectAddButtonClick.bind(this);

    // Filter Select Event Listeners
    this.handleFilterSelectChange = this.handleFilterSelectChange.bind(this);
    this.handleFilterSelectOpen = this.handleFilterSelectOpen.bind(this);
    this.handleFilterSelectClose = this.handleFilterSelectClose.bind(this);
    this.handleFilterSelectAddButtonClick = this.handleFilterSelectAddButtonClick.bind(this);

    // Add View Modal Event Listeners
    this.handleViewAddModalClose = this.handleViewAddModalClose.bind(this);
    this.handleSaveView = this.handleSaveView.bind(this);

    // Add Filter Modal Event Listeners
    this.handleFilterAddModalClose = this.handleFilterAddModalClose.bind(this);
    this.handleSaveFilter = this.handleSaveFilter.bind(this);

    this.handleAddCriteria = this.handleAddCriteria.bind(this);

    // AG GRID EVENT Listeners
    this.onGridReady = this.onGridReady.bind(this);
    this.onGridFilterChanged = this.onGridFilterChanged.bind(this);
    this.renderFilterWidget = this.renderFilterWidget.bind(this);

    // Handle filter widget options
    this.handleFilterRemoveClick = this.handleFilterRemoveClick.bind(this);
    this.handleFilterAddOr = this.handleFilterAddOr.bind(this);
    this.handleFilterAddAnd = this.handleFilterAddAnd.bind(this);


    this.handleChangeFieldCondition = this.handleChangeFieldCondition.bind(this);
    this.handleChangeFieldValue = this.handleChangeFieldValue.bind(this);
    this.handleChangeDateField = this.handleChangeDateField.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);

    this.handleFilter = this.handleFilter.bind(this);

    this.onGridReady = this.onGridReady.bind(this);

    this.handleBasicFilter = this.handleBasicFilter.bind(this);
    this.handleAdvancedFilter = this.handleAdvancedFilter.bind(this);

    console.log('state', this.state)
  }

  componentDidMount() {

    if(typeof this.state.elements === 'undefined') {
      this.setState({elements:[],values:[],selected:[],conditions:[],ands: []})
    }

    let viewType = this.props.listViewType
    let option
    let chosenViewOption = this.props.chosenViewOption
    if(chosenViewOption !== null && typeof chosenViewOption !== 'undefined') {
      if(viewType === chosenViewOption.viewType) {
        option = {
          viewName: chosenViewOption.viewName,
          viewType: this.props.listViewType
        };
        this.setState({isViewNavigated: true})
        this.props.handleViewSelectChange(option);
      }
      else{
        this.setState({isViewNavigated: false})
      }
    }

    let chosenFilterOption = this.props.chosenFilterOption
    if(chosenFilterOption !== null && typeof chosenFilterOption !== 'undefined') {
      if(chosenFilterOption.filterType === viewType) {
        option = {
          filterName: chosenFilterOption.filterName,
          filterType: chosenFilterOption.filterType
        };
        this.setState({isFilterNavigated: true})
        this.props.handleFilterSelectChange(option);
      }
      else{
        this.setState({isFilterNavigated: false, filterMode: 1})
      }
    }
  }

  //------------------ Event Listeners ------------------
  toggleFilter() {
    if(this.state.isShowFilter === false) {
      if(typeof this.state.elements !== 'undefined') {
        if(this.state.elements.length === 0) {
          this.addCriteria(false, 0);
        }
      }
    }
    this.setState({isShowFilter: !this.state.isShowFilter});
  }

  handleViewSelectChange(event) {
    if (event != null) {
      const option = {
        viewName:event.value,
        viewType: this.props.listViewType
      };
      this.props.handleViewSelectChange(option);
    } else {
      this.props.handleRemoveSavedViewOption(this.props.chosenViewOption);
    }
  }

  handleViewSelectOpen() {
    //this.setState({isShowViewAddButton: true});
    const selectOptionDivIndex = this.refViewSelect.control.parentElement.childNodes.length;
    const height = this.refViewSelect.control.scrollHeight + this.refViewSelect.control.parentElement.childNodes[selectOptionDivIndex - 1].scrollHeight;
    this.refViewAddButton.style.position = 'absolute';
    this.refViewAddButton.style.display = 'block';
    this.refViewAddButton.style.top = height + 'px';
    this.refViewAddButton.style.left = '0';
    this.refViewAddButton.style.width = '100%';
  }
  handleViewSelectClose() {

    let setStateDelay = ()=>{ 
      if(this.refViewAddButton !== null) {
        this.refViewAddButton.style.display = 'none'
      } 
    };
    setStateDelay = setStateDelay.bind(this);
    setTimeout( setStateDelay, 150);
  }

  handleViewSelectAddButtonClick() {
    this.setState({ isShowAddViewModal: true, isEnableRenderTable:false });
  }

  handleFilterSelectChange(event) {
    if(event != null) {
      const option = {
        filterName:event.value,
        filterType: this.props.listViewType
      };
      this.props.handleFilterSelectChange(option);
    } else {
      this.props.handleRemoveSavedFilterOption(this.props.chosenFilterOption);
    }
  }

  handleFilterSelectOpen() {
    //this.setState({isShowFilterAddButton: true});
    const selectOptionDivIndex = this.refFilterSelect.control.parentElement.childNodes.length;
    const height = this.refFilterSelect.control.scrollHeight + this.refFilterSelect.control.parentElement.childNodes[selectOptionDivIndex - 1].scrollHeight;
    this.refFilterAddButton.style.position = 'absolute';
    this.refFilterAddButton.style.top = height + 'px';
    this.refFilterAddButton.style.top = height + 'px';
    this.refFilterAddButton.style.display = 'block';
    this.refFilterAddButton.style.left = '0';
    this.refFilterAddButton.style.width = '100%';
  }

  handleFilterSelectClose() {
    let setStateDelay = ()=>{
      if(this.refFilterAddButton !== null) {
        this.refFilterAddButton.style.display = 'none'
      } 
    };
    setStateDelay = setStateDelay.bind(this);
    setTimeout( setStateDelay, 150);
  }

  handleFilterSelectAddButtonClick() {
    if(this.state.isShowFilter === false) {
      this.toggleFilter()
    }
    this.setState({ isShowAddFilterModal: true, isEnableRenderTable: false });
  }

  handleAddCriteria() {
    this.addCriteria(false, 0);
  }

  addCriteria(and, i) {
    let j = i+1;
    let showfilter = this.state.isShowFilter;
    let elements = this.state.elements;
    let values = this.state.values;
    let selected = this.state.selected;
    let conditions = this.state.conditions;
    let ands = this.state.ands;

    if(ands.length==1){
      ands[0].value = and;
    }

    elements.splice(j,0,"");
    values.splice(j,0,{value:''})
    selected.splice(j,0,{value:''});
    conditions.splice(j,0,{value:''});
    ands.splice(j,0,{value:and});

    if(i>0 && !and && ands[j-1]!=and && (ands[j+1]!=undefined || ands[j+1]!=and)){
      ands[j-1] = {value:and};
      values[j] = values[j-1];
      selected[j] = selected[j-1];
      conditions[j] = conditions[j-1];
    }

    this.setState({ showfilter:showfilter,elements:elements,values:values,selected:selected,conditions:conditions,ands: ands});
  }

  handleFilter() {
    this.doFilter()
  }

  doFilter() {
    let elements = this.state.elements;
    let values = this.state.values;
    let selected = this.state.selected;
    let conditions = this.state.conditions;
    let ands = this.state.ands;
    let listViewRowData;

    if(typeof elements === 'undefined')
      return;

    if (elements.length == 0 && values.length == 0 && selected.length == 0 && ands.length == 0) {
      listViewRowData = this.props.listViewRowData;
      this.setState({listViewRowData:listViewRowData})
      return;
    }

    if(elements == "" && values[0].value == "" && values.length == 1 && selected[0].value == "" && selected.length == 1 && conditions[0].value == "" && conditions.length == 1 && ands[0].value == "" && ands.length == 1) {
      listViewRowData = this.props.listViewRowData;
    } else {
      listViewRowData = this.props.listViewRowData.filter((t) => {
        if (selected.length <= 0) return true;

        let andconditions = [];
        let orconditions = [];

        for (let i=0; i< selected.length; i++) {
          let sel = selected[i];
          if (!sel.value) continue;

          let condition = conditions[i].value;
          let and = ands[i].value;

          if(and) {
            if (dateTypeHeaderFields.indexOf(sel.value) !== -1) {
              andconditions = buildDateConditions(andconditions, condition, t[sel.value], values[i].value, values[i].value2);
            } else {
              andconditions = buildConditions(andconditions, condition, t[sel.value], values[i].value);
            }
          } else {
            if (dateTypeHeaderFields.indexOf(sel.value) !== -1) {
              orconditions = buildDateConditions(orconditions, condition, t[sel.value], values[i].value, values[i].value2);
            } else {
              orconditions = buildConditions(orconditions, condition, t[sel.value], values[i].value);
            }
          }
        }

        return andconditions.reduce((prevVal, el) => prevVal && el, true) &&
          orconditions.reduce((prevVal, el) => prevVal + el, false);
      });
    };

    this.setState({listViewRowData:listViewRowData})
  }

  //--- Add View Modal Events---
  handleViewAddModalClose() {
    this.setState({ isShowAddViewModal: false });
  }
  handleSaveView() {
    if (this.viewModalInput.value) {
      const viewName = this.viewModalInput.value;
      let chosenColumns = [];
      this.columnApi.getColumnState().forEach(function(column) {
        chosenColumns.push(column);
      });
      let viewOption = {
        viewName,
        chosenColumns,
        viewType: this.props.listViewType
      };
      this.props.handleSaveViewClick(viewOption);
    }
    // Close Modal
    this.handleViewAddModalClose();
  }
  //--- Add Filter Modal Events---
  handleFilterAddModalClose() {
    this.setState({ isShowAddFilterModal: false})
  }

  handleSaveFilter() {
    if(this.filterModalInput.value) {
      const filterName = this.filterModalInput.value;

      let filterData = {
        filterData: { elements:this.state.elements, values: this.state.values, selected:this.state.selected, conditions:this.state.conditions, ands: this.state.ands }
      };
      const filterOption = {
        filterName,
        filterData,
        filterType: this.props.listViewType,
        filterMode: this.state.filterMode
      };
      this.props.handleSaveFilterClick(filterOption);
    }
    // Close modal
    this.handleFilterAddModalClose();
  }
  //------ AG GRID EVENT LISTENRES
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
  onGridFilterChanged() {

  }
  //--------- Filter widget listeners---------------
  handleChangeField = (i) => (val) => {
    //let ands = [{value:false}], elements = [''], selected =[''], values = [{value:''}];
    let selected = [...this.state.selected];

    // 2. Make a shallow copy of the item you want to mutate
    let select = {...selected[i]};
    // 3. Replace the property you're intested in
    if(val != null)
      select.value = val.value;
    else{
      select.value = '';
      this.clearDateValues(i)
    }
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    selected[i] = select;
    // 5. Set the state to our new copy
    this.setState({selected});
  };

  clearDateValues = (i) => {
    const { values } = this.state;
    this.setState({
      values: values.map((fieldValue, index) => i === index ? {
        ...fieldValue,
        value: '',
        value2: ''
      } : fieldValue),
    });
  };

  handleChangeFieldValue = (e) => {

    let values = [...this.state.values];
    // 2. Make a shallow copy of the item you want to mutate
    let value = {...values[e.target.name]};
    // 3. Replace the property you're intested in
    value.value = e.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    values[e.target.name] = value;
    // 5. Set the state to our new copy
    this.setState({values});
  };

  handleChangeDateField = (i) => (value) => {
    const { conditions, values } = this.state;
    this.setState({
      conditions: conditions.map((condition, index) => i === index ? {
        ...condition,
        value: value.condition
      } : condition),
      values: values.map((fieldValue, index) => i === index ? {
        ...fieldValue,
        value: value.date,
        value2: value.date2
      } : fieldValue),
    });
  };

  handleChangeFieldCondition = (i) => (val) => {

    let conditions = [...this.state.conditions];

    // 2. Make a shallow copy of the item you want to mutate
    let condition = {...conditions[i]};

    // 3. Replace the property you're intested in
    if(val != null)
      condition.value = val.value;
    else
      condition.value = '';
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    conditions[i] = condition;
    // 5. Set the state to our new copy
    this.setState({conditions});
  };

  //---------------------handle remove widget ------------
  handleFilterRemoveClick = (i) => (event) => {
    let elements = [...this.state.elements];
    elements.splice(i,1);
    this.setState({ elements });

    let selected = [...this.state.selected];
    selected.splice(i,1);
    this.setState({ selected });

    let values = [...this.state.values];
    values.splice(i,1);
    this.setState({ values });

    let ands = [...this.state.ands];
    ands.splice(i,1);
    this.setState({ ands });
  }

  handleFilterAddOr(i) {
    const _onChange = (val) => {
      if(val!=null){
        this.addCriteria(false,i);
      }
    };
    return _onChange; // you can also do return _onChange.bind(this) if you need the scope.
  }

  handleFilterAddAnd(i) {
    const _onChange = (val) => {
      if(val!=null){
        this.addCriteria(true,i);
      }
    };
    return _onChange; // you can also do return _onChange.bind(this) if you need the scope.
  }
  //================================================

  handleBasicFilter() {
    this.setState({elements:[],values:[],selected:[],conditions:[],ands: [], filterMode: 0}, () => {
      this.addCriteria(false, 0)
    })

  }

  handleAdvancedFilter() {
    this.setState({elements:[],values:[],selected:[],conditions:[],ands: [], filterMode: 1}, () => this.addCriteria(false, 0))
  }

  renderFilterWidget() {
    const {
      listViewHeaders
    } = this.props;

    let options = [];
    if (listViewHeaders != undefined) {
      listViewHeaders.map((header, i) => {options.push({value: header.field, label: header.headerName, idx:i})});
    }

    let {ands, elements, selected, values, conditions, filterMode} = this.state;
    if (ands == null) {
      ands =[];
      elements =[];
      selected = [];
      values = [];
      conditions = [];
    }
    let andWidget = ands.length>0?ands[0].value:false;
    let widgets= [];
    let widget = [];

    elements.map((el, i) => {
      let ordisabled =false;
      let anddisabled = false;

      if(ands[i].value) {
        anddisabled = true;
      }

      if(andWidget != ands[i].value) {
        andWidget = !andWidget;
        widget[widget.length - 1].anddisabled = false;
        widgets.push(widget);
        if(selected[i] == null)
          return;

        widget = [{
            selected: selected[i].value,
            condition: conditions[i].value,
            value: values[i].value,
            and: ands[i].value,
            idx: i,
            ordisabled: ordisabled,
            anddisabled: anddisabled
          }];
      } else {
        widget.push({
          selected:selected[i].value,
          condition: conditions[i].value,
          value: values[i].value,
          and: ands[i].value,
          idx:i,
          ordisabled: ordisabled,
          anddisabled: anddisabled
        });
      }

      if (i+1 == elements.length) {
        widget[widget.length - 1].anddisabled = false;
        widgets.push(widget);
      }
    });

    let lastWidgetSize = 0;
    let andOrWidgets = widgets.map((widget, w) => {
      let count = widget.length;
      let and = widget[0].and;
      let braceHeight = 0.62 * count + 'em';
      let top = 20 * (count - 1) + 6 + 'px';
      lastWidgetSize = w > 0 ? lastWidgetSize + widgets[w-1].length: 0;
      return (<Row key={`criteria-${ w }`}>
        <Col xs="1" style={{marginTop:"2px"}}>
          <div style={{display:count>1?"block":"none",height:braceHeight}} className="brace brace_part1"/>
          <div style={{display:count>1?"block":"none",height:braceHeight}} className="brace brace_part2"/>
          <div style={{display:count>1?"block":"none",height:braceHeight}} className="brace brace_part3"/>
          <div style={{display:count>1?"block":"none",height:braceHeight}} className="brace brace_part4"/>
          <div style={{display:count>1?"block":"none",position:"absolute",top:top,marginLeft:"-10px"}}>{and?"AND":"OR"}</div>
        </Col>
        <Col> {widget.map((el, i) => {
          let ordisabled = el.ordisabled;
          let anddisabled = el.anddisabled;
          let j = lastWidgetSize + i;
          const hiddenStyle = { display: filterMode === 1 ? 'block' : 'none' }

          return (
            <Row key={`and-${ j }`} style={{marginTop:'2px'}}>
              <Col xs={{size:3}}>
                <Select
                  name="fields"
                  options={options}
                  value={el.selected}
                  onChange={this.handleChangeField(j)}
                />
              </Col>
              <Col xs={6}>
                {dateTypeHeaderFields.indexOf(el.selected) !== -1 ? (
                  <DateFilterField
                    onChange={this.handleChangeDateField(j)}
                    value={{
                      condition: el.condition,
                      date: el.value,
                      date2: el.value2
                    }}
                  />
                ) : (
                  <Row>
                    <Col xs={7}>
                      <Select
                        name="conditions"
                        options={listViewConditions}
                        value={el.condition}
                        onChange={this.handleChangeFieldCondition(j)}
                      />
                    </Col>
                    <Col xs={5}>
                      <Input
                        type="text"
                        value={el.value}
                        name={j}
                        className="Select-placeholder"
                        onChange={this.handleChangeFieldValue}
                      />
                    </Col>
                  </Row>
                )}
              </Col>
              <Col xs={3} style={hiddenStyle}>
                <Button color="success" onClick={ this.handleFilterRemoveClick(j) }>-</Button>{' '}
                <Button color="success" onClick={ this.handleFilterAddOr(j) } disabled={ordisabled}>OR</Button>{' '}
                <Button color="success" onClick={ this.handleFilterAddAnd(j) } disabled={anddisabled}>AND</Button>
              </Col>
            </Row>
          )
        })}
          <Row><Col xs={{size:1}}>{w<widgets.length-1?"and":""}</Col></Row>
        </Col>
      </Row>);
    });

    return (<Container>
      <Row>
        <Col xs="1"></Col>
        <Col xs="4" style={{marginBottom:"5px",textAlign:"left"}}>
          All of these conditions should be met
        </Col>
        <Col> </Col>
      </Row>
      {andOrWidgets}
    </Container>)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listViewRowData) {
      this.setState({listViewRowData: nextProps.listViewRowData});
    }
    let temp = this.props.chosenFilterOption

    if (this.props.chosenFilterOption !== nextProps.chosenFilterOption) {

      if(nextProps.chosenFilterOption !== null) {
        let {ands, elements, selected, values, conditions} = nextProps.chosenFilterOption.filterData.filterData;
        let filterMode = nextProps.chosenFilterOption.filterMode
        this.setState({isShowFilter:true, ands: ands, elements:elements, selected:selected, values:values, conditions: conditions, filterMode: filterMode}, () => {
          this.doFilter()
        });
      } 
      else { // If Croos anchor click in "Choose Filter" dropdown  
        this.setState({isShowFilter:false,elements:[],values:[],selected:[],conditions:[],ands: [], filterMode: 1})
      }
    }
    else{
      if(nextProps.chosenFilterOption !== null && typeof nextProps.chosenFilterOption !== 'undefined' && this.state.isFilterNavigated === true) {
        if(typeof nextProps.chosenFilterOption.filterData.filterData !== 'undefined') {
          let {ands, elements, selected, values, conditions} = nextProps.chosenFilterOption.filterData.filterData;
          let filterMode = nextProps.chosenFilterOption.filterMode
          this.setState({isShowFilter:true, ands: ands, elements:elements, selected:selected, values:values, conditions: conditions, filterMode: filterMode}, () => {
            this.doFilter()
          });
        }
        
      }
      //this.doFilter()
    }
    
    if (nextProps.savedViewOptions) {
      this.setState({savedViewOptions:nextProps.savedViewOptions});
      this.setState({savedFilterOptions:nextProps.savedFilterOptions});
    }

    if (this.props.chosenViewOption != nextProps.chosenViewOption) {
      if (nextProps.chosenViewOption != null)
      {
        if (nextProps.chosenViewOption.chosenColumns != null) {

          if (this.columnApi != null)
          {
            this.columnApi.setColumnState(nextProps.chosenViewOption.chosenColumns);
          }
        }
      }
      this.setState({chosenViewOption: nextProps.chosenViewOption});
    }
    else{
      if (this.state.isViewNavigated === true) {
        if (nextProps.chosenViewOption != null)
        {
          if (nextProps.chosenViewOption.chosenColumns != null) {

            if (this.columnApi != null)
            {
              this.columnApi.setColumnState(nextProps.chosenViewOption.chosenColumns);
            }
          }
        }
        this.setState({chosenViewOption: nextProps.chosenViewOption});
      }
    }
  }

  render() {

    const {
      chosenFilterOption,
      listViewHeaders
    } = this.props;
    const {
      listViewRowData,
      savedViewOptions,
      savedFilterOptions,
      chosenViewOption,
      filterMode
    } = this.state;

    let viewType = this.props.listViewType
    let newCriteriaBtnDisabled = filterMode === 1 ? false : true
    //----- Make the options of saved view selects
    let viewSelectOptions = [];
    let chosenViewSelectOption = '';
    if (chosenViewOption != null)
    {
      chosenViewSelectOption = chosenViewOption.viewName;
    }

    console.log('saved', savedViewOptions)

    savedViewOptions.map(
      (view) => viewSelectOptions.push({
        value:view.viewName,
        label:view.viewName
      })
    );

    let filterSelectOptions = [];
    let chosenFilterSelectOption = '';
    if (chosenFilterOption != null) {
      chosenFilterSelectOption = chosenFilterOption.filterName;
    }

    savedFilterOptions.map(
      (filterOption) => filterSelectOptions.push({
        value:filterOption.filterName,
        label: filterOption.filterName
      })
    );

    if (this.gridApi != null)
      this.gridApi.sizeColumnsToFit();
    return(
      <div className="listView">
        <Row className="listView-header">
          <Col xs="2" className="listView-filterContainer">
            <a href="#">
              <FaFilter
                className="listView-filterIcon"
                color={!this.state.isShowFilter?'Grey':'Green'}
                size="50"
                onClick={this.toggleFilter}
              />
            </a>
          </Col>
          <Col xs="6" className="listView-title text-center">
            <h2>{viewType}</h2>
          </Col>
          <Col xs="2" className="text-left p-0">
            <Select
              name="chooseView"
              options={viewSelectOptions}
              onChange={this.handleViewSelectChange}
              onOpen={this.handleViewSelectOpen}
              onClose={this.handleViewSelectClose}
              value={chosenViewSelectOption}
              placeholder="Choose View"
              autosize={true}
              ref={(ref) => this.refViewSelect = ref}
            />
            <button
              ref={(ref) => this.refViewAddButton = ref}
              className="btn-success btn-add"
              onClick={this.handleViewSelectAddButtonClick}
              style={{display: 'none'}}
            >
              +Add
            </button>
          </Col>
          <Col xs="2" className="text-left p-0">
            <Select
              name="hidcols"
              options={filterSelectOptions}
              value={chosenFilterSelectOption}
              onChange={this.handleFilterSelectChange}
              onOpen={this.handleFilterSelectOpen}
              onClose={this.handleFilterSelectClose}
              placeholder="Choose Filter"
              autosize={true}
              ref={(ref) => this.refFilterSelect = ref}
            />
            <button
              ref={(ref) => this.refFilterAddButton = ref}
              className="btn-success btn-add"
              onClick={this.handleFilterSelectAddButtonClick}
              style={{display: 'none'}}
            >
              +Add
            </button>
          </Col>
        </Row>
        <Collapse isOpened={this.state.isShowFilter}>
          <Row>
            <Col xs="12" className="text-left">
              <Button className="mr-1" disabled={newCriteriaBtnDisabled} color="success" onClick={this.handleAddCriteria}>New Criteria</Button>
              <Button color="success" onClick={this.handleFilter}>Filter</Button>
              <Button color="success" className="float-right" onClick={this.handleBasicFilter}>Basic</Button>
              <Button color="success" className="mr-1 float-right" onClick={this.handleAdvancedFilter}>Advanced</Button>
            </Col>
          </Row>
          <Jumbotron className="pt-4 pb-4">
            <Container>
              {this.renderFilterWidget()}
            </Container>
          </Jumbotron>
        </Collapse>
        <div className="ag-fresh listView-container">
          <AgGridReact
            columnDefs={listViewHeaders}
            rowData={listViewRowData}
            enableFilter={true}
            enableColResize={true}
            enableSorting={true}
            floatingFilter={true}
            onGridReady={this.onGridReady}
            onGridSizeChanged={this.onGridReady}
            onColumnVisible={this.onGridFilterChanged}
          >
          </AgGridReact>
        </div>
        <div className="listView-modal-container">
          <Dialog
            title={
              <div>
                Add View
                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' className="close-img" onClick={this.handleViewAddModalClose}/>
              </div>
            }
            modal={false}
            open={this.state.isShowAddViewModal}
            onRequestClose={this.handleViewAddModalClose}
          >
            <label>View name:<input type="text" name="viewname"  ref={input => {
              this.viewModalInput= input;
            }}/></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color="success" onClick={this.handleSaveView}>Save</Button>{' '}
          </Dialog>
          <Dialog
            title={
              <div>
                Add Filter
                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' className="close-img" onClick={this.handleFilterAddModalClose}/>
              </div>
            }
            modal={false}
            open={this.state.isShowAddFilterModal}
            onRequestClose={ this.handleFilterAddModalClose}
          >
            <label>Filter name:<input type="text" name="filtername"  ref={input => {
              this.filterModalInput = input;
            }}/></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color="success" onClick={this.handleSaveFilter}>Save</Button>{' '}
          </Dialog>
        </div>
      </div>
    )
  }
}

ListView.propTypes = {
  handleViewSelectChange: PropTypes.func,
  handleSaveViewClick: PropTypes.func,
  handleRemoveSavedViewOption: PropTypes.func,
  handleFilterSelectChange: PropTypes.func,
  handleSaveFilterClick: PropTypes.func,
  handleRemoveSavedFilterOption: PropTypes.func
};

export default ListView;