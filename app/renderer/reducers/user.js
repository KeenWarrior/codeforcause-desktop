import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT,
  SILENT_LOGIN,
  DISMISS_LOGIN,
  UPDATE_PROFILE,
} from '../actions/user';
import produce from 'immer';

const INITIAL_STATE = {
  firebaseUser: undefined,
  login: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return produce(state, (draft) => {
        draft.login = true;
      });
    }

    case LOGIN_SUCCESS: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.firebaseUser = user;
      });
    }

    case SILENT_LOGIN: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.firebaseUser = user;
      });
    }

    case DISMISS_LOGIN: {
      return produce(state, (draft) => {
        draft.login = false;
      });
    }

    case LOGIN_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case LOGOUT: {
      return produce(state, (draft) => {
        draft.firebaseUser = null;
      });
    }

    case UPDATE_PROFILE: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.firebaseUser = user;
      });
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
