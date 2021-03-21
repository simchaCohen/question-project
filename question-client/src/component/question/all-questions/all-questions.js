import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { actions } from "../../../store/actions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function mapStateToProps(state) {
  return {
    question: state.question_reducer.question,
    // logQuestion: state.log_question_reducer.logQuestion
  };
}
const mapDispatchToProps = (dispatch) => ({
  getQuestion: () => dispatch(actions.getQuestion()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function AllQuestion(props) {
  const classes = useStyles();
  const { question, getQuestion, history } = props
  useEffect(() => {
    if (question.length === 0) {
      getQuestion()
    }
  }, [getQuestion, question]);
  
  const view = ( i) => {
    history.push('/view-question/' + i)
  }
  const logSelected = () => {
    history.push('/log-question')  
  }
  return (
    <React.Fragment>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              The Question
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Questions of all kinds and possible categories that will give you intelligence on everything around the world
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Add New Question
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={() => { logSelected() }}>
                    Your Selected Questions
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">

          <Grid container spacing={4}>
            {question.map((q, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {q.category ? q.category.title : ''}
                    </Typography>
                    <Typography>
                      {q.question}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => { view( i) }}>
                      View Answer
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}))