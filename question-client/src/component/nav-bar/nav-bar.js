import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { actions } from "../../store/actions";
import { connect } from 'react-redux';
import {
    Switch,
    Route,
} from "react-router-dom";
import './nav-bar.css'
import AllQuestions from '../question/all-questions/all-questions';
import ViewQuestion from '../question/view-question/view-question';
import SignIn from '../login/sign-in/sign-in'
import SignUp from '../login/sign-up/sign-up'
import LogQuestion from "../question/log-question/log-question";
import AddQuestion from "../question/add-question/add-question";
import EditQuestion from "../question/edit-question/edit-question";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const mapDispatchToProps = (dispatch) => ({
    delToken: () => dispatch(actions.delToken())
})
function mapStateToProps(state) {
    return {
        token: state.public_reducer.token
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(function NavBar(props) {
    const classes = useStyles();
    const { token, delToken } = props
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <ContactSupportIcon />
                    <Typography variant="h6" className={classes.title}>
                        The Question
                     </Typography>
                    {token !== '' ?
                        <>
                            <Button color="inherit"> <Link to="/all-questions" className="a-sign">All Question</Link></Button>
                            <Button color="inherit"> <Link to="/log-out" className="a-sign" onClick={()=>delToken()}>LogOut</Link></Button>
                        </>  :
                        <>
                            <Button color="inherit"> <Link to="/" className="a-sign">Sign In</Link></Button>
                            <Button color="inherit"> <Link to="/Sign-up" className="a-sign">Sign Up</Link></Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/sign-up">
                    <SignUp />
                </Route>
                <Route path="/all-questions">
                    <AllQuestions></AllQuestions>
                </Route>
                <Route path="/view-question/:index">
                    <ViewQuestion></ViewQuestion>
                </Route>
                <Route path="/log-question">
                    <LogQuestion></LogQuestion>
                </Route>
                <Route path="/add-question">
                    <AddQuestion></AddQuestion>
                </Route>
                <Route path="/edit-question/:index">
                    <EditQuestion></EditQuestion>
                </Route>
                <Route path="/log-out">
                    {/* {delToken()} */}
                    < SignIn ></SignIn>
                </Route>
                <Route path="/">
                    <SignIn></SignIn>
                </Route>
            </Switch>
        </div >
    );
})

