import { put, call, takeLatest, all } from 'redux-saga/effects';
import * as TerminalApi from './terminalApi';

export function* terminalApiSubscriber() {
  yield all([takeLatest('GET_TERMINAL_DATA', getTerminalData)]);
}

export function* getTerminalData() {
  try {
    const terminalData = yield call(TerminalApi.getTerminalData);
    let terminals = terminalData.data.results[0].Terminals;
    let terminalHeaders = [];
    for (let key in terminals[0]) {
      if (terminals[0].hasOwnProperty(key)) {
        terminalHeaders.push({headerName: key.toUpperCase(), field: key, width: 150, filter: 'agSetColumnFilter',hide:true, headerTooltip: 'This is tooltip of ' + key});
      }
    }
    terminalHeaders.sort((a, b) => a.headerName.localeCompare(b.headerName));
    terminalHeaders.map((head,i)=> {head.hide=i>=8; return head});

    yield put({ type: 'GET_TERMINAL_DATA_SUCCEEDED', terminals, terminalHeaders });
  } catch (error) {
    console.log('ERROR', error);
    yield put({ type: 'GET_TERMINAL_DATA_FAILED', error });
  }
}
