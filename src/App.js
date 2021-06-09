import React, {useState, useEffect} from 'react';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import {HashRouter, Switch, Route, useHistory} from 'react-router-dom';
import Login from "./components/login/Login";
import ProfilePage from "./pages/profile/";
import Feed from "./pages/Feed";
import PrivateRoute from "./Services/privateRoute";
import { useGetUsers } from "./Services/userService";
import store from "./store";
import { LoginAction } from "./store/actions/auth";
import Header from "./components/header/Header";
import SignUp from "./components/login/SignUp";
import Contacts from "./pages/contacts/Contacts";
import { Avatar } from '@material-ui/core';
import logo from './assets/images/logo1.png';
import SearchPage from './pages/SearchPage/Search';
import Messenger from './pages/Messenger/Messenger';


const App = () =>{
  const mode = useSelector(state=>state.util);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getUsers = useGetUsers();
  const theme = createMuiTheme({
    palette:{
      type:mode?"dark":"light",
    }
  });
  useEffect(()=>{
    setLoading(true);
    dispatch({type:"USER_LOADING"})
    getUsers().then((data, status)=>{
      if(data.status === 'Authorized'){ 
        setLoading(false)
        store.dispatch(LoginAction(data))
      }
    }).catch(err=>{
      setLoading(false);
      if(err === 'Unauthorized'){
        dispatch({type:"AUTH_ERROR"});
        setLoading(false);
      }
    })
  },[])
  
  return(
    <ThemeProvider theme={theme}>
      {loading?(
        <div style={{display:'flex', width:'100%', height:'100vh', justifyContent:'center', alignItems:'center'}}>
          <Avatar src={logo} style={{width:'15rem', height:'15rem'}} />
        </div>):(
          <HashRouter>
            <Header />
            <Switch>
              <Route component={Login} exact path={"/login"} />
              <Route component={SignUp} exact path={"/signup"} />
              <PrivateRoute component={SearchPage} exact path={"/search"} />
              <PrivateRoute component={Messenger} exact path={"/contacts/:username"} />
              <PrivateRoute component={Feed} exact path={"/"} />
              <PrivateRoute component={Contacts} exact path={"/contacts"} />
              <PrivateRoute component={ProfilePage} path={"/:username"} />
            </Switch>
            
          </HashRouter>
        )
      }
    </ThemeProvider>
    
  )
}

export default  App;