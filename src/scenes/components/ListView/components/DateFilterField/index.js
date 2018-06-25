import React, { Component } from 'react';
import moment from 'moment';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';

import DateTimeInput from '../DateTimeInput';
import 'react-select/dist/react-select.css';

const dateConditionOptions = [
  { value: 'on', label: 'on' },
  { value: 'not_on', label: 'not on' },
  { value: 'before', label: 'before' },
  { value: 'at_or_before', label: 'at or before' },
  { value: 'after', label: 'after' },
  { value: 'at_or_after', label: 'at or after' },
  { value: 'between', label: 'between' },
  { value: 'is_empty', label: 'is empty' },
  { value: 'is_anything', label: 'is anything' }
];

class DateFilterField extends Component {
  static defaultProps = {
    value: {
      condition: null,
      date: moment().format('YYYY-MM-DD'),
      date2: moment().format('YYYY-MM-DD')
    }
  };

  handleChangeConditions = (item) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      condition: item ? item.value : ''
    });
  };

  handleChangeDate = (date) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      date
    });
  };

  handleChangeDate2 = (date2) => {
    const { onChange, value } = this.props;
    console.log('date2', date2)
    onChange({
      ...value,
      date2
    });
  };

  render() {
    const { value } = this.props;
    return (
      <Row>
        <Col xs={4}>
          <Select
            name="conditions"
            options={dateConditionOptions}
            value={value.condition}
            onChange={this.handleChangeConditions}
          />
        </Col>
        <Col xs={8}>
          {value.condition === 'between' ? (
            <Row>
              <Col xs={6}>
                <DateTimeInput onChange={this.handleChangeDate} value={value.date} condition={value.condition} />
              </Col>
              <Col xs={6}>
                <DateTimeInput onChange={this.handleChangeDate2} value={value.date2} condition={value.condition} />
              </Col>
            </Row>
          ) : (
            <DateTimeInput onChange={this.handleChangeDate} value={value.date} condition={value.condition} />
          )}
        </Col>
      </Row>
    );
  }
}

export default DateFilterField;
