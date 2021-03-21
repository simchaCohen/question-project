import { actions } from '../actions';
import axios from 'axios';
export const addLogQuestion = ({ dispatch, getState }) => next => action => {
    if (action.type === "addLogQuestion") {
        let urlData = 'http://localhost:7000/question/addQuestion'
        let question = action.payload;
        question = { ...question, user_id: getState().user_reducer.user._id }
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': getState().public_reducer.token
        };
        axios.post(urlData, question, { headers })
            .then(function (response) {
                dispatch(actions.addLogQuestionServer(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return next(action);
}
export const editLogQuestion = ({ dispatch, getState }) => next => action => {
    if (action.type === "editLogQuestion") {
        let question = action.payload;
        let urlData = 'http://localhost:7000/question/editQuestion/' + question._id
        question = { ...question, user_id: getState().user_reducer.user._id }
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': getState().public_reducer.token
        };
        axios.put(urlData, question, { headers })
            .then(function (response) {
                dispatch(actions.editLogQuestionServer(question));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return next(action);
}

export const getCategoryQuestion = ({ dispatch, getState }) => next => action => {
    const category = getState().log_question_reducer.categoryQuestion
    if (category.length === 0) {
        if (action.type === 'getCategoryQuestion') {
            let urlData = 'https://jservice.io/api/categories?count=100'
            axios.get(urlData)
                .then(function (response) {
                    dispatch(actions.getCategoryQuestionServer(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return next(action);
}


export const getLogQuestion = ({ dispatch, getState }) => next => action => {
    // const logQuestion=getState().log_question_reducer.logQuestion
    // if (logQuestion.length === 0) {
        if (action.type === "getLogQuestion") {
            let urlData = 'http://localhost:7000/question/getQuestion/' + getState().user_reducer.user._id
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': getState().public_reducer.token
            };
            axios.get(urlData, { headers })
                .then(function (response) {
                    dispatch(actions.getLogQuestionServer(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    // }
    return next(action);
}
export const delLogQuestion = ({ dispatch, getState }) => next => action => {
    if (action.type === "delLogQuestion") {
        let urlData = 'http://localhost:7000/question/delQuestion/' + action.payload.id
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': getState().public_reducer.token
        };
        axios.delete(urlData, { headers })
            .then(function (response) {
                dispatch(actions.delLogQuestionServer(action.payload.index));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return next(action);
}