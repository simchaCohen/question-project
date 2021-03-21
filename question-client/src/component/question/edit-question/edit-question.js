import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { actions } from "../../../store/actions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import srcImg from '../../../assets/23984.jpg';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        height: 'calc(100vh - 64px);',
        backgroundImage: `url(${srcImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    root: {
        minWidth: 275,
        width: '50%',
        marginTop: '5%',
        padding: '20px'
    },
    title: {
        fontSize: '1.5em',
        color: 'rgb(0 51 90)'
    },
    answer: {
        color: '#0186eb'
    },
    pos: {
        marginBottom: 12,
        fontSize: '1.5em',
        color: 'rgb(0 51 90)'
    },
    pTitle: {
        textAlign: "center",
        fontSize: "1.5em",
        color: "#0186eb"
    }
});
const mapDispatchToProps = (dispatch) => ({
    editLogQuestion: (data) => dispatch(actions.editLogQuestion(data)),
    getCategoryQuestion: () => dispatch(actions.getCategoryQuestion()),
})
function mapStateToProps(state) {
    return {
        categoryQuestion: state.log_question_reducer.categoryQuestion,
        logQuestion: state.log_question_reducer.logQuestion
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
    function EditQuestion(props) {
        const classes = useStyles();
        const { history, editLogQuestion, getCategoryQuestion, categoryQuestion, logQuestion } = props
        const { index } = useParams();
        const [editQuestion, setEditQuestion] = useState(logQuestion[index]);
        const [update, setUpdate] = useState(false);

        // const [category] = useState(logQuestion[index].category);
        useEffect(() => {
            getCategoryQuestion()
        }, [getCategoryQuestion]);

        useEffect(() => {
            if (update === true) {
                editLogQuestion(editQuestion);
            }
        }, [editQuestion, editLogQuestion,update]);

        const [ind, setInd] = useState(1);

        const handleChangeOption = (e) => {
            let val = e.target.value
            if (val !== 'undefined' && val !== '' && val !== "") {
                setInd(val)
                val = categoryQuestion[val]
                // if (val.id !== category.id) {
                //     setCategory(val);
                // }
            }
        };

        const returnLogquestion = () => {
            history.push('/log-question')
        }

        return (
            <div className={classes.center}>
                <Card className={classes.root} variant="outlined">
                    <p className={classes.pTitle}>Edit Question</p>

                    <CardContent>
                        <CardActions style={{ justifyContent: "flex-end" }}>
                            <Button onClick={() => { returnLogquestion() }} variant="contained" color="primary" href="#contained-buttons" style={{ minWidth: "unset" }}>
                                <CloseRoundedIcon />
                            </Button>
                        </CardActions>
                        <Formik
                            initialValues={editQuestion}
                            validationSchema={Yup.object({
                                question: Yup.string()
                                    .required('Required'),
                                value: Yup.number()
                                    .required('Required'),
                                invalid_count: Yup.number().nullable(true)

                            })}
                            onSubmit={
                                (values, { setSubmitting }) => {
                                    // setEditQuestion(values)
                                    setEditQuestion({
                                        ...values,
                                        category: categoryQuestion[ind], category_id: categoryQuestion[ind].id
                                    })
                                    setUpdate(true)
                                    // val.category = categoryQuestion[ind]
                                    // val.category_id = categoryQuestion[ind].id
                                    // editLogQuestion(editQuestion);
                                    setSubmitting(false);
                                    returnLogquestion()
                                }}>
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <Field
                                            component={TextField}
                                            autoComplete="answer"
                                            name="answer"
                                            variant="outlined"
                                            fullWidth
                                            id="answer"
                                            label="answer"
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="question"
                                            label="question"
                                            name="question"
                                            autoComplete="question"
                                            multiline
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="value"
                                            label="value"
                                            id="value"
                                            autoComplete="value"

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                                            <Select
                                                required
                                                fullWidth
                                                style={{ width: '100%' }}
                                                native
                                                value={ind}
                                                defaultValue={categoryQuestion[ind]}
                                                onChange={(event) => handleChangeOption(event)}
                                                label="Category"

                                            >
                                                <option style={{ width: '100%' }} aria-label="None" value="" />
                                                {categoryQuestion.map((cat, i) => (
                                                    <option key={i} style={{ width: '100%' }} value={i}>{cat.title}</option>

                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            fullWidth
                                            name="invalid_count"
                                            label="invalid count"
                                            id="invalid_count"
                                            autoComplete="invalid_count"
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '15px' }}>
                                    Edit Question
                         </Button>
                            </Form>
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        );
    }))