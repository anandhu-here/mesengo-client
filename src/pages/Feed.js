import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Grid, Hidden, Paper } from "@material-ui/core";
import Style from "./Style";
import { lightPrimary } from "../assets/Colors";
import Sidebar from "../components/sidebar/Sidebar";
import Contacts from "../components/contacts/Contacts";
import Form from "../components/form/Form";
import Posts from "../components/posts/Posts";
import {LoginAction} from "../store/actions/auth";
import store from "../store";
import { useGetUsers } from "../Services/userService";
import Chat from "../components/Messenger/Chat";
import Search from "../components/Search/Search";
import BottomNav from "../components/BottomNav/bottomNav";
const Feed = (auth) =>{
  const mode = useSelector(state=>state.util);
  const [open, setOpen] = useState(false);
  const chat = useSelector(state=>state.chat)
  const getUsers = useGetUsers();
  
  const LoadUser = () =>{
    
    getUsers().then(data=>{
      store.dispatch(LoginAction(data))
    }).catch(err=>{
      if(err === 'Unauthorized'){
        
      }
    })
  }
  useEffect(() => {
    LoadUser()
  }, [])

  
  useEffect(()=>{
    if(chat.is_open){
      setOpen(true)
    }
    else setOpen(false);
  },[chat])
  const classes = Style();
  
  return(
    
      <Paper
        elevation={0}
        className={classes.root}
        style={{ backgroundColor: !mode && lightPrimary,  paddingTop:5 }}
      >
          <Grid className={classes.app}>
            
            <Chat open={open} profile_id={chat.profile_id} />
            <Grid item container className={classes.app__body}>
              {/* ----Body---- */}
              <Hidden smDown>
                <Grid item container className={classes.body__left} md={3}>
                  {/* ----Right sidebar---- */}
                  <Search />
                  <Contacts />
                </Grid>
              </Hidden>
              
              <Grid item container className={classes.body__feed} xs={12} sm={12} md={6}>
                {/* ----Feed---- */}
                <Grid item container className={classes.feed__form}>
                  {/* ----Upload Form---- */}
                  <Form />
                </Grid>
                <Grid item container className={classes.feed__posts}>
                  {/* ----Posts---- */}
                  <Posts />
                  
                  <BottomNav />
                </Grid>
              </Grid>
              <Hidden smDown>
                <Grid item container className={classes.body__left} md={3}>
                  {/* ----Sidebar---- */}
                  <Sidebar />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        
      </Paper>
    
  )
}

const mapStateToProps = (state) =>({
  auth: state.user
})
export default connect(mapStateToProps)(Feed);