import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { login, LoginAction } from '../../store/actions/auth';
import { useGetUsers } from '../../Services/userService';
import { useLogin } from '../../Services/authenticationService';
import store from '../../store';
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import { BaseColor, darkPrimary } from '../../assets/Colors';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" tp={"https://material-ui.com/"}>
        Your Website
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
  TextField:{
    "& .MuiFilledInput-root": {
      background: "yellow"
    }
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor:BaseColor,
    margin: theme.spacing(3, 0, 2),
  },
  cssLabel: {
    color:theme.palette.type === "dark" ? "lightgrey" : darkPrimary,
  },

  cssOutlinedInput: {
    
    '&$cssFocused $notchedOutline': {
      borderColor: `${BaseColor} !important`,
    }
  },

  cssFocused: {
    color:'white !important',
    borderWidth: '1px',
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: theme.palette.type === "dark" ? "lightgrey !important" : `${darkPrimary} !important`
  },
}));

export default function Login({cb}) {
  const classes = useStyles();
  const [loading, setLoad] = useState(false);
  const loginUser = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth_state = useSelector(state=>state.user);
  const history = useHistory()
  const dispatch = useDispatch();
  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoad(true);
    loginUser({email, password}).then(data=>{
      if(data.token){
        localStorage.setItem('token', data.token)
        store.dispatch(LoginAction(data))
      }
    }).catch(e=>{
      setLoad(false)
      dispatch({type:"AUTH_ERROR"})
    })
  } 
  useEffect(() => {
    if(auth_state.isAuth){
      history.push("/");
    }
    return ()=>{
      setLoad(false);
    }
  }, [auth_state])
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loading?<div>Luoading..</div>:<div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={logo} style={{width:"100%", height:'100%', objectFit:'contain'}} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            className={classes.TextField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                autoFill: classes.autoFill
              },
              inputMode: "numeric"
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              inputMode: "numeric"
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={(e)=>handleSubmit(e)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link tp={"#"} variant="body2" style={{color:'white'}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/signup"} variant="body2" style={{color:'white'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      }
    </Container>
  );
}