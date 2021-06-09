import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Hidden, Avatar, Tooltip, Paper, Badge, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { darkSecondary, darkPrimary } from "../../assets/Colors";

import { HomeOutlined, SendRounded } from "@material-ui/icons";
import { PlayCircleFilledWhiteOutlined } from "@material-ui/icons";
import { StoreMallDirectoryOutlined } from "@material-ui/icons";
import { SupervisedUserCircleOutlined } from "@material-ui/icons";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import AddIcon from "@material-ui/icons/Add";
import TelegramIcon from "@material-ui/icons/Telegram";
import Zoom from "@material-ui/core/Zoom";
import logo from "../../assets/images/logo1.png";
import { ToggleTheme } from "../../store/actions/util";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Style from "./Style";
import store from "../../store";
import { LogoutAction } from "../../store/actions/auth";
import { useHistory, useLocation } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.util);
  const {profile_picture, token} = useSelector(state => state.user);
  const [queryResults, setQResults] = useState([]);
  const history = useHistory();
  const Style = makeStyles((theme) => ({
    root:{ borderRadius: 0, width: "100%", height: "70px",display: !token?'none':'flex' },
    header: {
      flex:1,
      justifyContent:'space-evenly',
      widows: "100%",
      height: "100%",
      backgroundColor: theme.palette.type === "dark" && darkPrimary,
    },
    header__logo: {
      height: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 10,
    },
    logo__image: {
      height: 40,
      [theme.breakpoints.down("xs")]: {
        height: 32,
      },
    },
    
    header__nav: {
      display: "flex",
      height: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: "4px 60px",
      
      [theme.breakpoints.down("md")]: {
        padding: "4px 30px",
  
      },
      [theme.breakpoints.down("sm")]: {
        padding: "4px 10px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: 4,
      },
      color: "grey",
    },
  
    nav__links: {
      display: "flex",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      cursor: "pointer",
      transition: "all 0.5s ease",
      color: theme.palette.type === "dark" && "lightgrey",
      padding:10,
      "& > .MuiSvgIcon-root": {
        fontSize: 30,
      },
      "&:hover": {
        backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
      },
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-evenly",
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
  
    nav__links__specail: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      "& > *": {
        width: 30,
        height: 30,
      },
    },
  
    header__userinfo: {
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      "& > .MessengerBtn":{
        cursor: "pointer",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width: 40,
        height: 40,
        [theme.breakpoints.down("xs")]: {
          width: 32,
          height: 32,
        },
      },
      "& > .MuiAvatar-root": {
        cursor: "pointer",
        width: 40,
        height: 40,
        [theme.breakpoints.down("xs")]: {
          width: 32,
          height: 32,
        },
      },
    },
    userinfo__options: {
      height: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      color: theme.palette.type === "dark" ? "lightgrey" : "grey",
      "& > *": {
        borderRadius: 999,
        cursor: "pointer",
        fontSize: 30,
        [theme.breakpoints.down("md")]: {
          fontSize: 24,
        },
        backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "grey",
          color: "white",
        },
      },
    },
  }));
  const classes = Style();
  const changeTheme = () => {
    dispatch(ToggleTheme());
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [queryShow, setQShow] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleQShow = () =>{
    setQShow(false);
  }
  useEffect(()=>{
    if(queryResults){
      setQShow(true);
    }
    else setQShow(false);

  },[queryResults])
  const handleSearch = (e) =>{
    e.preventDefault();
    setQLoading(true);
    fetch(`api/profile/search?query=${e.target.value}`, {
      method:'GET',
      headers:{
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    }).then(response=>{
      response.text().then(data=>{
        setQLoading(false)
        const data_ = JSON.parse(data)
        setQResults(data_.results);

      })
    }).catch(e=>{
      setQLoading(false)
      console.log(e, "err")
    })
  }
  const logout = () =>{}
  const handleMEssenger = () =>{
    history.push('/contacts')
  } 
  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container className={classes.header}>
        {/*----Logo & Search icon--------*/}
        <Hidden xsDown>
          <Grid item className={classes.header__logo} sm={2} md={3}>
            <img className={classes.logo__image} src={logo} alt="facebook-logo" onClick={()=>history.push('/')} / >
            <Typography variant={"h5"} style={{marginLeft:'20px'}}>MESENGO</Typography>
          </Grid>
        </Hidden>
        {/*----Nav-Bar--------*/}
        <Grid item className={classes.header__nav} xs={12} sm={8} md={6}>
          <div className={`${classes.nav__links} ${classes.nav__links__specail}`} onClick={()=>history.push('/')}>
            <Avatar src={logo} />
          </div>
          
          
          
          
          <div className={`${classes.nav__links} ${classes.nav__links__specail}`}>
            <Avatar src={profile_picture} onClick={logout} />
          </div>
          <Hidden smUp>
          <div onClick={() => handleMEssenger()} className={classes.nav__links + " " + "Messengerbtn"}>
              <SendRounded style={{alignSelf:'center'}} />
          </div>
          </Hidden>
        </Grid>
        {/*----Userinfo and options--------*/}
        <Hidden xsDown>
          <Grid item className={classes.header__userinfo} md={3}>
            <div className={classes.nav__links} onClick={changeTheme}>
              {mode ? <Brightness4Icon /> : <BrightnessHighIcon />}
            </div>
            <div className={classes.nav__links} onClick={changeTheme}>
              <Avatar src={profile_picture} onClick={logout} />
            </div>
            
            
            <div onClick={() => handleMEssenger()} className={classes.nav__links + " " + "MessengerBtn"}>
                <SendRounded style={{alignSelf:'center'}} />
            </div>
            <Hidden smDown>
                <div className={classes.userinfo__options}>
                  <ArrowDropDownRoundedIcon onClick={handleClick}/>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={()=>{
                    store.dispatch(LogoutAction())
                  }}>Logout</MenuItem>
                </Menu>
              </div>
            </Hidden>
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  );
};

const defaultProps = {
  color: "secondary",
  children: <NotificationsNoneOutlinedIcon />,
};

export default Header;
