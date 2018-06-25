import { createActions } from 'redux-actions';

const {
  getCustomerData,
  addSavedViewOption,
  getSavedViewOptions,
  changeViewOption,
  removeSavedViewOption,
  addSavedFilterOption,
  getSavedFilterOptions,
  changeFilterOption,
  removeSavedFilterOption
} = createActions({
  GET_CUSTOMER_DATA: () => ({}),
  ADD_SAVED_VIEW_OPTION: (viewOption) => ({viewOption}),
  GET_SAVED_VIEW_OPTIONS:() => ({}),
  CHANGE_VIEW_OPTION: (optionName) => ({optionName}),
  REMOVE_SAVED_VIEW_OPTION: (optionName) => ({optionName}),
  ADD_SAVED_FILTER_OPTION: (filterOption) => ({filterOption}),
  GET_SAVED_FILTER_OPTIONS:() => ({}),
  CHANGE_FILTER_OPTION: (optionName) => ({optionName}),
  REMOVE_SAVED_FILTER_OPTION: (optionName) => ({optionName})
});

export {
  getCustomerData,
  addSavedViewOption,
  getSavedViewOptions,
  changeViewOption,
  removeSavedViewOption,
  addSavedFilterOption,
  getSavedFilterOptions,
  changeFilterOption,
  removeSavedFilterOption
};
