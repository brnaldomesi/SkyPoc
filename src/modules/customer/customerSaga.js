import { put, call, takeLatest, all } from 'redux-saga/effects';
import * as CustomerApi from './customerApi';

export function* customerApiSubscriber() {
  yield all([takeLatest('GET_CUSTOMER_DATA', getCustomerData)]);
}

export function* getCustomerData() {
  try {
    const customerData = yield call(CustomerApi.getCustomerData);

    let customers = customerData.data.results[0].Customers;
    let customerHeaders = [];

    for (let key in customers[0]) {
      if (customers[0].hasOwnProperty(key)) {
        customerHeaders.push({headerName: key.toUpperCase(), field: key, width: 150, filter: 'agSetColumnFilter',hide:true, headerTooltip: 'This is tooltip of ' + key});
      }
    }
    customerHeaders.sort((a, b) => a.headerName.localeCompare(b.headerName));
    customerHeaders.map((head,i)=> {head.hide=i>=8; return head});
    yield put({ type: 'GET_CUSTOMER_DATA_SUCCEEDED', customers, customerHeaders });
  } catch (error) {
    console.log('ERROR', error);
    yield put({ type: 'GET_CUSTOMER_DATA_FAILED', error });
  }
}
