import produce from 'immer';
import createReducer from "./reducer-util";


const initialState = {
    token: ""
}

const token = {
    setToken(state, action) {
        state.token=action.payload;
    },
    delToken(state, action) {
        state.token="";
    }
    
};

export default produce((state, action) => createReducer(state, action, token), initialState);

