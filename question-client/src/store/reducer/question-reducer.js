import produce from 'immer';
import createReducer from "./reducer-util";


const initialState = {
    question: []
}

const question = {
    getQuestionServer(state, action) {
        state.question.push(...action.payload);
        
    }
};

export default produce((state, action) => createReducer(state, action, question), initialState);

