import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { actions } from "../../../store/actions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";
import srcImg from '../../../assets/23984.jpg';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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
    marginTop: '10%',
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
});
const mapDispatchToProps = (dispatch) => ({
  addLogQuestion: (data) => dispatch(actions.addLogQuestion(data)),
})
function mapStateToProps(state) {
  return {
    question: state.question_reducer.question
  };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(
  function ViewQuestion(props) {
    const classes = useStyles();

    const { question,history,addLogQuestion } = props
    const { index } = useParams();
    const [viewQuestion] = useState(question[index]);
    useEffect(() => {
      addLogQuestion(viewQuestion)
  }, [addLogQuestion,viewQuestion]);


    const returnAllquestion=()=>{
      history.push('/all-questions')
    }
    return (
      <div className={classes.center}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <CardActions style={{justifyContent: "flex-end"}}>
              <Button onClick={()=>{returnAllquestion()}} variant="contained" color="primary" href="#contained-buttons" style={{minWidth: "unset"}}>
                <ArrowForwardIcon/>
            </Button>
            </CardActions>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              <ContactSupportIcon /> {viewQuestion.category.title}
            </Typography>
            <Typography variant="h5" className={classes.answer} component="h2">
              Answer:  {viewQuestion.answer}

            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Question:  {viewQuestion.question}
            </Typography>
            <Typography variant="body2" component="p">
              created at:  {viewQuestion.created_at}
              <br />
            updated at:  {viewQuestion.updated_at}
              <br />
            value:  {viewQuestion.value}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Your Selected Questions</Button>
          </CardActions>
        </Card>
      </div>
    );
  }))