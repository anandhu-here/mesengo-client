import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch } from 'react-redux';
import ChatBox from './ChatBox';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(155, 68, 106, 0.36)',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function Messenger({open}) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const handleClose = () =>{
    dispatch({type:"CHAT_CLOSE"})
  }
  return (
    <div>
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
          <ChatBox />
        </Fade>
      </Modal>
    </div>
  );
}

export default Messenger;