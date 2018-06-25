import { handleActions } from 'redux-actions';
import {
  getCustomerData,
} from './customerAction';

const defaultState = {
  loading: true,
  error: null,
  customers: [],
  customerHeaders:[],
};

const reducer = handleActions(
  {
    [getCustomerData](state) {
      // noinspection JSAnnotator
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    GET_CUSTOMER_DATA_SUCCEEDED: (state, { customers, customerHeaders }) => ({
      ...state,
      loading: false,
      error: null,
      customers,
      customerHeaders
    }),
    GET_CUSTOMER_DATA_FAILED: (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  },
  defaultState
);

export default reducer;
