import { handleActions } from 'redux-actions';
import {
  addSavedViewOption,
  getSavedViewOptions,
  changeViewOption,
  removeSavedViewOption,
  addSavedFilterOption,
  getSavedFilterOptions,
  changeFilterOption,
  removeSavedFilterOption
} from './ListViewAction';

import ListViewStorage from './ListViewStorage';

const defaultState = {
  loading: true,
  error: null,
  savedViewOptions: [],
  chosenViewOptions:[],
  chosenViewOption: null,
  savedFilterOptions: [],
  chosenFilterOptions:[],
  chosenFilterOption: {
    filterName:'',
    filterType:'',
    filterMode:1,
    filterData: {
      ands:[],
      elements:[],
      selected:[],
      values:[],
      conditions:[]
    }
  }
};

const reducer = handleActions(
  {
    [addSavedViewOption](state, {payload: {viewOption} }) {
      console.log(viewOption);
      let savedViewOptions = state.savedViewOptions;

      let filteredByTypeViewOption = savedViewOptions.filter((t)=> t.viewType === viewOption.viewType && t.viewName === viewOption.viewName)
      if(filteredByTypeViewOption.length === 1)
        filteredByTypeViewOption = filteredByTypeViewOption[0]
      
      let existIndex = -1
      existIndex = savedViewOptions.indexOf(filteredByTypeViewOption)
      if(existIndex !== -1) {
        savedViewOptions[existIndex] = viewOption
      }
      else {
        savedViewOptions.push(viewOption)
      }

      ListViewStorage.updateSavedViewOptions(savedViewOptions);

      // Make options for current page
      let chosenOptions = savedViewOptions.filter((t)=> t.viewType === viewOption.viewType);

      return {
        ...state,
        savedViewOptions: savedViewOptions,
        chosenViewOption: viewOption,
        chosenViewOptions: chosenOptions
      }
    },
    [getSavedViewOptions](state, {payload: {type}}) {
      let savedViewOptions = ListViewStorage.getSavedViewOptions();
      let returnOptions = savedViewOptions.filter((t)=> t.viewType === type)
      return {
        ...state,
        savedViewOptions: savedViewOptions,
        chosenViewOptions: returnOptions,
      };
    },
    [changeViewOption](state, {payload: {option}}) {
      let chosenViewOption = state.savedViewOptions.filter(view => view.viewName === option.viewName && view.viewType === option.viewType)[0];
      return {
        ...state,
        chosenViewOption: chosenViewOption
      };
    },
    [removeSavedViewOption](state, {payload: {option}}) {
      let savedViewOptions = state.savedViewOptions;
      let chosenViewOption = savedViewOptions.filter(view => view.viewName === option.viewName)[0];
      const indexOfChosen = savedViewOptions.indexOf(chosenViewOption);
      if (indexOfChosen > -1) {
        savedViewOptions.splice(indexOfChosen, 1);
      }

      ListViewStorage.updateSavedViewOptions(savedViewOptions);

      let chosenOptions = savedViewOptions.filter((t)=> t.viewType === option.viewType);

      return {
        ...state,
        savedViewOptions: savedViewOptions,
        chosenViewOption: null,
        chosenViewOptions: chosenOptions
      };
    },
    [addSavedFilterOption](state, {payload: {filterOption}}) {
      console.log(filterOption);
      let savedFilterOptions = state.savedFilterOptions;
      if (savedFilterOptions == null)
        savedFilterOptions = [];

      let filteredByTypeFilterOption = savedFilterOptions.filter((t)=> t.filterType === filterOption.filterType && t.filterName === filterOption.filterName)
      if(filteredByTypeFilterOption.length === 1)
        filteredByTypeFilterOption = filteredByTypeFilterOption[0]
      
      let existIndex = -1
      existIndex = savedFilterOptions.indexOf(filteredByTypeFilterOption)
      if(existIndex !== -1) {
        savedFilterOptions[existIndex] = filterOption
      }
      else {
        savedFilterOptions.push(filterOption)
      }

      ListViewStorage.updateSavedFilterOptions(savedFilterOptions);

      // Make options for current page
      let chosenOptions = savedFilterOptions.filter((t)=> t.filterType === filterOption.filterType);
      console.log('ADDDED STATUUS');
      console.log(filterOption.filterType);
      console.log(chosenOptions);

      return {
        ...state,
        savedFilterOptions: savedFilterOptions,
        chosenFilterOption: filterOption,
        chosenFilterOptions: chosenOptions
      }
    },
    [getSavedFilterOptions](state, {payload: {type}}) {
      let savedFilterOptions = ListViewStorage.getSavedFilterOptions();
      let returnOptions = savedFilterOptions.filter((t)=> t.filterType === type)

      return {
        ...state,
        savedFilterOptions: savedFilterOptions,
        chosenFilterOptions: returnOptions
        //chosenFilterOption: chosenFilterOption
      };
    },
    [changeFilterOption](state, {payload: {option}}) {
      let chosenFilterOption = state.savedFilterOptions.filter(optionIndex => optionIndex.filterName === option.filterName && optionIndex.filterType === option.filterType)[0];
      return {
        ...state,
        chosenFilterOption: chosenFilterOption
      };
    },
    [removeSavedFilterOption](state, {payload: {option}}) {
      let savedFilterOptions = state.savedFilterOptions;
      let chosenFilterOption = savedFilterOptions.filter(option => option.filterName === option.filterName)[0];
      const indexOfChosen = savedFilterOptions.indexOf(chosenFilterOption);
      if (indexOfChosen > -1) {
        //savedFilterOptions.splice(indexOfChosen, 1);
      }

      ListViewStorage.updateSavedFilterOptions(savedFilterOptions);

      let returnOptions = savedFilterOptions.filter((t)=> t.filterType === option.filterType);

      return {
        ...state,
        savedFilterOptions: savedFilterOptions,
        chosenFilterOption: null,
        chosenFilterOptions: returnOptions
      };
    }
  },
  defaultState
);

export default reducer;