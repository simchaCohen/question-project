import { createStore, combineReducers,applyMiddleware  } from 'redux';
import {addUser,sigInUser} from './middle-ware/user-crud'
import { getQuestion } from "./middle-ware/question-crud";
import {  addLogQuestion,getLogQuestion,getCategoryQuestion,delLogQuestion,editLogQuestion} from "./middle-ware/log-question-crud";
import user_reducer from './reducer/user-reducer';
import question_reducer from "./reducer/question-reducer";
import public_reducer from "./reducer/public-reducer";
import log_question_reducer from "./reducer/log-question-reducer";
const reducer = combineReducers({user_reducer,question_reducer,public_reducer,log_question_reducer});

const store = createStore(reducer,applyMiddleware(addUser,getQuestion,
    sigInUser,addLogQuestion,getLogQuestion,
    getCategoryQuestion,delLogQuestion,editLogQuestion));
window.store = store;
export default store;
// store.dispatch(push('/all-questions'))