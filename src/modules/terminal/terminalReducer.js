import { handleActions } from 'redux-actions';

import { getTerminalData } from './terminalAction';

const defaultState = {
  loading: true,
  error: null,
  terminals: [],
  terminalHeaders: []
};

const reducer = handleActions(
  {
    [getTerminalData](state) {
      // noinspection JSAnnotator
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    GET_TERMINAL_DATA_SUCCEEDED: (state, { terminals, terminalHeaders }) => ({
      ...state,
      loading: false,
      error: null,
      terminals,
      terminalHeaders
    }),
    GET_TERMINAL_DATA_FAILED: (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  },
  defaultState
);

export default reducer;
