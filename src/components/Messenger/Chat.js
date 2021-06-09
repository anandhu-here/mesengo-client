import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch } from 'react-redux';
import Messenger from '../../pages/Messenger/Messenger';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  chat_root:{
    width:'30%',
    height:'90vh',
    backgroundColor:'transparant', 
    [theme.breakpoints.down("md")]: {
        width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
        "& > .left_arrow":{
            display: 'block',
        },
        width: "100%",
        height:"100vh"
    },
},
  modal: {
    display: 'flex',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(155, 68, 106, 0.36)'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function Chat({open, profile_id}) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const handleClose = () =>{
    dispatch({type:"CHAT_CLOSE"})
  }
  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          
        }}
      >
        <Fade in={open}>
          <Paper className={classes.chat_root}>
              <Messenger profile_id={profile_id}/>
          </Paper>
        </Fade>
      </Modal>
  );
}

export default Chat;