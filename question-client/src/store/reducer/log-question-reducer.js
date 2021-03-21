import produce from 'immer';
import createReducer from "./reducer-util";


const initialState = {
    logQuestion: [],
    categoryQuestion: []
}

const logQuestion = {
    addLogQuestionServer(state, action) {
        state.logQuestion.push(action.payload);
    },
    getLogQuestionServer(state, action) {
        state.logQuestion=action.payload;
    },
    getCategoryQuestionServer(state, action) {
        state.categoryQuestion=action.payload;
    },
    delLogQuestionServer(state, action) {
        state.logQuestion.splice(action.payload, 1);
    },
    editLogQuestionServer(state, action) {
        // state.logQuestion.splice(action.payload, 1);
        let item = state.logQuestion.find(x => x._id === action.payload._id);
        if (item) {
            item=action.payload;
        }
    },

};

export default produce((state, action) => createReducer(state, action, logQuestion), initialState);

