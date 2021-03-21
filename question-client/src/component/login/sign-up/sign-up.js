import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { actions } from '../../../store/actions';
import { Link } from "react-router-dom";
import './sign-up.css'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link className="a-turciz" href="#">
                Simcha Cohen
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#ffb411',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const mapDispatchToProps = (dispatch) => ({
    addUser: (userToAdd) => dispatch(actions.addUser(userToAdd))
})
function mapStateToProps(state) {
    return {
        token: state.public_reducer.token
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(function SignUp(props) {

    const { addUser, token, history } = props;
    const classes = useStyles();

    useEffect(() => {
        if (token!=="")
            history.push('/all-questions')
    }, [token,history]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        email: Yup.string()
                            .email('Must be valid email')
                            .required('Required'),
                        password: Yup.string()
                            .matches(
                                /[#,&,*,^]/,
                                'Need one special character'
                            )
                            .min(8, 'Must be 8 characters or more')
                            .required('Required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        addUser(values);
                        setSubmitting(false);
                    }}  >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Field
                                    component={TextField}
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                           
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Sign Up
                         </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/" className="a-turciz" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
})