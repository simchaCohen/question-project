import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { actions } from "../../../store/actions";
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        height: 'calc(100vh - 64px);',
        // flexDirection:' column !important',
    },
    root: {
        padding: '20px',
        width: '70%',
        marginTop: '5%',
    },
    container: {
        maxHeight: 440,
    },
    pTitle: {
        textAlign: "center",
        fontSize: "1.5em",
        color: "#0186eb"
    }
});
function mapStateToProps(state) {
    return {
        logQuestion: state.log_question_reducer.logQuestion
    };
}
const mapDispatchToProps = (dispatch) => ({
    getLogQuestion: () => dispatch(actions.getLogQuestion()),
    delLogQuestion:(delQuestion)=>dispatch(actions.delLogQuestion(delQuestion))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function LogQuestion(props) {
    const classes = useStyles();

    const { logQuestion, getLogQuestion, history,delLogQuestion } = props
    const [openDialog, setOpenDialog] = useState(false);
    const [delQuestion, setDelQuestion] = useState({id:'',index:-1});
    

    const handleClickOpen = (id,index) => {
        setDelQuestion({id:id,index:index})
        setOpenDialog(true);
    };
  
    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleCloseOk = () => {
        setOpenDialog(false);
        delLogQuestion(delQuestion)
        setDelQuestion({id:'',index:-1})
    };
    useEffect(() => {
        getLogQuestion()
    }, [getLogQuestion]);

    const add = () => {
        history.push('/add-question')
    }
    const edit=(index)=>{
        history.push('/edit-question/'+index)
    }

    return (
        <div className={classes.center}>

            <Paper className={classes.root} >
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <Button onClick={() => add()} variant="contained" color="primary" style={{ minWidth: "unset" }}>
                        <AddIcon />
                    </Button>
                </div>
                <p className={classes.pTitle} >All Your Selected Question</p>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Question</TableCell>
                                <TableCell>Answer</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logQuestion.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell align='left' component="th" scope="row">
                                        {log.category ? log.category.title : ''}
                                    </TableCell>
                                    <TableCell align="left">{log.question.slice(0, 40)}...</TableCell>
                                    <TableCell align="left">{log.answer}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={
                                            () => edit(index)
                                            } variant="contained" color="primary"  style={{ minWidth: "unset" }}>
                                            <EditIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button 
                                        onClick={
                                            ()=>handleClickOpen(log._id,index)
                                        }
                                            variant="contained" color="primary" style={{ minWidth: "unset" }}>
                                            <DeleteIcon />
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
            <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete the Question</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {delQuestion.index!==-1?
           logQuestion[delQuestion.index].question:''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseOk} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}))