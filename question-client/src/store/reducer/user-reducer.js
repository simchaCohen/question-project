import produce from 'immer';
import createReducer from "./reducer-util";


const initialState = {
    user: {}
}

const user = {
    addUserServer(state, action) {
        state.user = action.payload;
    }
};

export default produce((state, action) => createReducer(state, action, user), initialState);

