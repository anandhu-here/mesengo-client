import { Avatar, Grid, Hidden, makeStyles, Paper } from "@material-ui/core";
import { HomeOutlined, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { BaseColor } from "../../assets/Colors";



const BottomNav = () => {
    const {token} = useSelector(state=>state.user);
    const Style = makeStyles((theme)=>({
        root:{
            display: !token?'none':'flex',
            position:'absolute',
            width:'100%',
            zIndex:100,
            bottom:0,
            backgroundColor:BaseColor
        },
        container:{
            flex:1,
            justifyContent:'space-evenly',
            alignItems:'center',
            height: '60px',
        }
    }))
  const classes = Style();
  const {profile_picture} = useSelector(state=>state.user)
  const history = useHistory();
  const {id, first_name} = useSelector(state=>state.user);
  const handleSearchIcon = () =>{
    history.push('/search')
  }
  const handleProfile = (id) =>{
    localStorage.setItem('current_profile_id', id);
    history.push({pathname: `/${first_name}`, state:{id:id}});
  }
  return (
    <Hidden smUp>
        <Paper className={classes.root} elevation={0} >
            <Grid container className={classes.container}>
                <Grid item sm={3} >
                    <div onClick={()=>history.push("/")}>
                    <HomeOutlined style={{alignSelf:'center'}} />
                    </div>
                </Grid>
                <Grid item sm={3} >
                    <div onClick={()=>handleSearchIcon()} >
                        <SearchOutlined style={{alignSelf:'center'}} />
                    </div>
                </Grid>
                <Grid item sm={3} >
                    <HomeOutlined />
                </Grid>
                <Grid item sm={3} >
                    <div onClick={()=>handleProfile(id)} style={{display:'flex',justifyContent:'center', alignItems:'center' }} >
                        <Avatar src={profile_picture} style={{width:'30px', height:'30px'}} />
                    </div>
                </Grid>
            </Grid>
        </Paper>
    </Hidden>
  );
};



export default BottomNav;
