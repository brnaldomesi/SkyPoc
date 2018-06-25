import { createActions } from 'redux-actions';

const {
  addSavedViewOption,
  getSavedViewOptions,
  changeViewOption,
  removeSavedViewOption,
  addSavedFilterOption,
  getSavedFilterOptions,
  changeFilterOption,
  removeSavedFilterOption
} = createActions({
  ADD_SAVED_VIEW_OPTION: (viewOption) => ({viewOption}),
  GET_SAVED_VIEW_OPTIONS:(type) => ({type}),
  CHANGE_VIEW_OPTION: (option) => ({option}),
  REMOVE_SAVED_VIEW_OPTION: (option) => ({option}),
  ADD_SAVED_FILTER_OPTION: (filterOption) => ({filterOption}),
  GET_SAVED_FILTER_OPTIONS:(type) => ({type}),
  CHANGE_FILTER_OPTION: (option) => ({option}),
  REMOVE_SAVED_FILTER_OPTION: (option) => ({option})
});

export {
  addSavedViewOption,
  getSavedViewOptions,
  changeViewOption,
  removeSavedViewOption,
  addSavedFilterOption,
  getSavedFilterOptions,
  changeFilterOption,
  removeSavedFilterOption
};