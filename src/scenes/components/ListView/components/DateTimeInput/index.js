import React from 'react';
import moment from 'moment';
import ReactDateTime from 'react-datetime';
import { Button, Col, Collapse, Dropdown, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import 'react-datetime/css/react-datetime.css';
import './style.css';

const namedDateList = [
  {
    listKey: 'days',
    label: 'Days',
    list: [
      {
        getValue: ({ condition }) => moment().startOf('day'),
        label: 'Today'
      },
      {
        getValue: ({ condition }) => moment().subtract(1, 'days').startOf('day'),
        label: 'Yesterday'
      },
      {
        getValue: ({ condition }) => moment().add(1, 'days').startOf('day'),
        label: 'Tomorrow'
      },
      {
        getValue: ({ condition }) => moment().subtract(7, 'days').startOf('day'),
        label: 'Last 7 days'
      },
      {
        getValue: ({ condition }) => moment().subtract(30, 'days').startOf('day'),
        label: 'Last 30 days'
      },
      {
        getValue: ({ condition }) => moment().subtract(60, 'days').startOf('day'),
        label: 'Last 60 days'
      },
      {
        getValue: ({ condition }) => moment().subtract(90, 'days').startOf('day'),
        label: 'Last 90 days'
      },
      {
        getValue: ({ condition }) => moment().subtract(120, 'days').startOf('day'),
        label: 'Last 120 days'
      },
    ]
  },
  {
    listKey: 'weeks',
    label: 'Weeks',
    list: [
      {
        getValue: ({ condition }) => moment().startOf('isoWeek'),
        label: 'This week'
      },
      {
        getValue: ({ condition }) => moment().subtract(7, 'days').startOf('isoWeek'),
        label: 'Last week'
      },
      {
        getValue: ({ condition }) => moment().add(7, 'days').startOf('isoWeek'),
        label: 'Next week'
      },
    ]
  },
  {
    listKey: 'months',
    label: 'Months',
    list: [
      {
        getValue: ({ condition }) => moment().startOf('month'),
        label: 'This month'
      },
      {
        getValue: ({ condition }) => moment().subtract(1, 'months').startOf('month'),
        label: 'Last month'
      },
      {
        getValue: ({ condition }) => moment().add(1, 'months').startOf('month'),
        label: 'Next month'
      },
      {
        getValue: ({ condition }) => moment().subtract(3, 'months').startOf('month'),
        label: 'Last 3 months'
      },
      {
        getValue: ({ condition }) => moment().subtract(6, 'months').startOf('month'),
        label: 'Last 6 months'
      },
      {
        getValue: ({ condition }) => moment().subtract(9, 'months').startOf('month'),
        label: 'Last 9 months'
      },
      {
        getValue: ({ condition }) => moment().subtract(12, 'months').startOf('month'),
        label: 'Last 12 months'
      }
    ]
  },
  {
    listKey: 'quarter',
    label: 'Quarter',
    list: [
      {
        getValue: ({ condition }) => moment().startOf('quarter'),
        label: 'This quarter'
      },
      {
        getValue: ({ condition }) => moment().subtract(1, 'quarters').startOf('quarter'),
        label: 'Last quarter'
      },
      {
        getValue: ({ condition }) => moment().subtract(2, 'quarters').startOf('quarter'),
        label: 'Last 2 quarters'
      },
      {
        getValue: ({ condition }) => moment().add(1, 'quarters').startOf('quarter'),
        label: 'Next quarter'
      },
      {
        getValue: ({ condition }) => moment().add(2, 'quarters').startOf('quarter'),
        label: 'Next 2 quarters'
      }
    ]
  },
  {
    listKey: 'minutes',
    label: 'Minutes',
    list: [
      {
        getValue: ({ condition }) => moment().startOf('hour'),
        label: 'Current hour'
      },
      {
        getValue: ({ condition }) => moment().subtract(1, 'hours').startOf('hour'),
        label: 'Last hour'
      },
      {
        getValue: ({ condition }) => moment().subtract(2, 'hours').startOf('hour'),
        label: 'Last 2 hours'
      },
      {
        getValue: ({ condition }) => moment().startOf('minute'),
        label: 'Current minute'
      },
      {
        getValue: ({ condition }) => moment().subtract(1, 'minutes').startOf('minute'),
        label: 'Last minute'
      },
      {
        getValue: ({ condition }) => moment().subtract(15, 'minutes').startOf('minute'),
        label: 'Last 15 minutes'
      },
      {
        getValue: ({ condition }) => moment().subtract(30, 'minutes').startOf('minute'),
        label: 'Last 30 minutes'
      },
      {
        getValue: ({ condition }) => moment().subtract(1, 'hours').startOf('minute'),
        label: 'Last 45 minutes'
      }
    ]
  }
];

// Fiscal
//  This fiscal month
//  Last fiscal month
//  Next fiscal month
//  Last 3 fiscal months
//  Last 12 fiscal months
//  Next 3 fiscal months
//  Next 12 fiscal months
//  This Fiscal Quarter
//  Last Fiscal Quarter
//  Last 4 fiscal quarters
//  Next Fiscal Quarter
//  Next 4 fiscal quarters
//  This fiscal year
//  Last fiscal year
//  Next fiscal year

export default class DateTimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      viewMode: 'days'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.dropdownOpen !== nextState.dropdownOpen ||
      this.state.listKey !== nextState.listKey ||
      this.props.value !== nextProps.value ||
      this.props.condition !== nextProps.condition) {
      return true
    } else {
      return false
    }
  }

  handleToggle = (event) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      listKey: null
    });

  }

  handleChange = (date) => {
    const { onChange } = this.props;
    if (this.state.viewMode === 'days') {
      this.handleToggle()
    }
    onChange({
      label: date.format('YYYY-MM-DD HH:mm'),
      date
    });
  };

  handleViewModeChange = (viewMode) => {
    this.setState({
      viewMode: viewMode
    })
  }

  handleToggleList = (newListKey) => (event) => {
    const { listKey } = this.state;
    this.setState({ listKey: newListKey === listKey ? null : newListKey });
  };

  handleListItemClick = (item) => (event) => {
    const { onChange } = this.props;
    this.handleToggle();
    onChange({
      label: item.label,
      date: item.getValue(this.props)
    });
  };

  getLabel(value) {
    if (value) {
      const dateValue = moment(value.date);
      if (value.label) {
        return value.label;
      } else if (dateValue.isValid()) {
        return dateValue.format('YYYY-MM-DD HH:mm');
      }
    }
    return 'Choose..';
  }

  getSanitizedValue(value) {
    if (value) {
      const dateValue = moment(value.date);
      if (dateValue.isValid()) {
        return dateValue;
      }
    }
    return moment();
  }

  render() {
    const { value } = this.props;
    const { dropdownOpen, listKey } = this.state;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.handleToggle}>
        <DropdownToggle
          block
          caret
          onClick={this.handleToggle}
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
          className="date-time-input__dropdown-toggle"
        >
          {this.getLabel(value)}
        </DropdownToggle>
        <DropdownMenu className="date-time-input__dropdown-menu">
          <Row>
            <Col xs={4}>
              {namedDateList.map((dateList) => (
                <div key={dateList.listKey}>
                  <Button color="link" onClick={this.handleToggleList(dateList.listKey)}>{dateList.label}</Button>
                  <Collapse isOpen={listKey === dateList.listKey}>
                    <div>
                      {dateList.list.map((item, index) => (
                        <div className="date-time-input__list-item" key={index}>
                          <Button
                            color="link"
                            className="date-time-input__list-link"
                            onClick={this.handleListItemClick(item)}>
                            {item.label}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </div>
              ))}
            </Col>
            <Col xs={8}>
              <ReactDateTime
                onChange={this.handleChange}
                onViewModeChange={this.handleViewModeChange}
                value={this.getSanitizedValue(value)}
                input={false}
              />
            </Col>
          </Row>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
