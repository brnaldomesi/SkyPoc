import { createActions } from 'redux-actions';

const {
  toggleLeftSidebar
} = createActions({
  TOGGLE_LEFT_SIDEBAR: () => ({})
});

export { toggleLeftSidebar };
