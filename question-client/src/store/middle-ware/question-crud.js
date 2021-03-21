import { actions } from '../actions';
import axios from 'axios';
// import { createBrowserHistory } from 'history'

export const getQuestion = ({ dispatch, getState }) => next => action => {
    if (getState().question_reducer.question.length === 0) {
        if (action.type === 'getQuestion') {
            let urlData = 'https://jservice.io/api/random?count=25'
            axios.get(urlData)
                .then(function (response) {
                    dispatch(actions.getQuestionServer(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return next(action);
}
