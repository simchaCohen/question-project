import { actions } from '../actions';
import axios from 'axios';
// import history from '../../history-browser'
export const addUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'addUser') {
        let urlData = 'http://localhost:7000/user/addUser'
        let user = action.payload;
        axios.post(urlData, user)
            .then(function (response) {
                dispatch(actions.setToken(response.data.token));
                dispatch(actions.addUserServer(response.data.user));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return next(action);
}


export const sigInUser = ({ dispatch, getState }) => next => action => {
    
    if (action.type === "sigInUser") {
        let urlData = 'http://localhost:7000/user/sigIn'
        let sign = action.payload;
        axios.post(urlData, sign)
            .then(function (response) {
                dispatch(actions.setToken(response.data.token));
                dispatch(actions.addUserServer(response.data.user));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return next(action);
}