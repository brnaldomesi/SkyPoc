import { handleActions } from 'redux-actions';
import { toggleLeftSidebar } from "./LeftSidebarAction";

const defaultState = {
  isLeftSidebarOpen: true
};

const reducer = handleActions(
  {
  [toggleLeftSidebar](state) {
    // noinspection JSAnnotator
    return {
      ...state,
      isLeftSidebarOpen: !state.isLeftSidebarOpen,
    };
  }},
  defaultState
);

export default reducer;