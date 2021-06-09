import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Grid, Hidden, Paper } from "@material-ui/core";
import {profilePageStyle as Style} from "./Style";
import { lightPrimary } from "../../assets/Colors";
import store from "../../store";
import Profile from './Profile';
const datainfo = {
  first_name : "Kundi",
  bio: "I am kundi and I like it!",
  followers: 10,
  following: 1,
}
import ProfileInfo from "./profileInfo";
import { useLocation } from "react-router-dom";
import {useGetProfile } from '../../Services/profileActon';
import { clearProfileState, profileInfoAction } from "../../store/actions/profile";
import profile from "../../store/reducers/profile";
import BottomNav from "../../components/BottomNav/bottomNav";


const Feed = (auth) =>{
  const [current_id, setCurrent] = useState(null)
  const [profile_info, setInfo] = useState({first_name:null, last_name:null,profile_picture:null,conver_id_direct:null, bio:null, id:null, follower_count:null, following_count:null, is_following:null, is_followed:null})
  const mode = useSelector(state=>state.util);
  const dispatch = useDispatch();
  const {isAuth} = useSelector(state=>state.user)
  const getProfileInfo = useGetProfile();
  const location = useLocation();
  const classes = Style();
  const displayName = false;
  
  useEffect(()=>{
    let _id = localStorage.getItem('current_profile_id');
    setCurrent(_id);
    getProfileInfo(_id).then(data=>{
      setInfo(prevState =>({...prevState, ...data.profile}));
      store.dispatch(profileInfoAction(data.profile));
    }).catch(e=>console.log(e, "error"))
    return ()=>{
      store.dispatch(clearProfileState())
    }
    
  },[])
  
  return(
    
      <Paper
        elevation={0}
        className={classes.root}
        style={{ backgroundColor: !mode && lightPrimary }}
      >
         <Grid item container className={classes.app__body}>
              {/* ----Body---- */}
              <Hidden smDown mdDown>
                <Grid item container className={classes.body__right} md={3} sm={12} xl={3}>
                    {/* ----Right sidebar---- */}
                    <ProfileInfo
                      first_name={profile_info.first_name}
                      last_name = {profile_info.last_name}
                      bio={profile_info.bio}
                      profile_picture={profile_info.profile_picture}
                      id={profile_info.id}
                      follower_count={profile_info.follower_count}
                      following_count={profile_info.following_count}
                      is_following={profile_info.is_following}
                      is_followed = {profile_info.is_followed}
                      conver_id_direct={profile_info.conver_id_direct}
                    /> 
                </Grid>
              </Hidden>
              
              <Grid item container className={classes.body__feed} xs={12} sm={12} md={7} xl={7} >
                <Hidden mdUp >
                <ProfileInfo
                      first_name={profile_info.first_name}
                      last_name = {profile_info.last_name}
                      bio={profile_info.bio}
                      profile_picture={profile_info.profile_picture}
                      id={profile_info.id}
                      follower_count={profile_info.follower_count}
                      following_count={profile_info.following_count}
                      is_following={profile_info.is_following}
                      is_followed = {profile_info.is_followed}
                    /> 
                </Hidden>
                <Grid item container className={classes.feed__posts}>
                  {/* ----Posts---- */}
                  <Profile/>
                </Grid>
              </Grid>
            </Grid> 
          <BottomNav />
      </Paper>
    
  )
}

const mapStateToProps = (state) =>({
  auth: state.user
})
export default connect(mapStateToProps)(Feed);