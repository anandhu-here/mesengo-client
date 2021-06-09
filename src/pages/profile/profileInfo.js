import React, { useState, useEffect } from "react";
import { Avatar, Tooltip, Paper, Divider, Box } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import PermIdentity from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {profileInfoStyle as Style} from "./Style";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";
import {useGetProfile } from '../../Services/profileActon';
import { useSelector, useDispatch } from "react-redux";
import { RecordVoiceOverOutlined, Settings, Telegram } from "@material-ui/icons";
import Chat from '../../components/Messenger/Chat';

const ProfileInfo = ({first_name,conver_id_direct, last_name,profile_picture, bio, id, follower_count, following_count, is_following, is_followed}) => {
  const classes = Style();
  const chat = useSelector(state=>state.chat);
  const [open, setOpen] = useState(false);
  const {user_profile_id, token} = useSelector(state=>state.user);
  const [isFollowing, setIsFollowing] = useState(is_following); 
  const [followerCount, setFollowerCount] = useState(follower_count);
  const dispatch = useDispatch();
  useEffect(()=>{
    setIsFollowing(is_following);
    setFollowerCount(follower_count);
  },[follower_count,is_following])
  const handleFollowbtn = () =>{
    fetch(`/api/profile/action`, {
      method:'POST',
      headers:{
        'Authorization':`Token ${token}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({action:'follow', id:id})
    })
      .then(res=>{
        if(res.ok){
          res.text().then(data=>{
            const json_data = JSON.parse(data);
            setIsFollowing(json_data.is_following);
            setFollowerCount(json_data.follower_count);
          })
        }
      })
  }
  const handleProfileTextButton = () =>{
    if(window.screen.width > 500){
      dispatch({type:"CHAT_USER_LOADED",payload:{other_user:first_name, id:conver_id_direct, other_profile_picture:profile_picture}})
      dispatch({type:"CHAT_OPEN", payload:{}})
    }
  }
  useEffect(()=>{
    if(chat.is_open){
      setOpen(true);
    }
    else setOpen(false)
  },[chat])
  return (
    <Box boxShadow={15} className={classes.profile_box}>
      <Chat open={open} profile_id={id} />
        <div className={classes.contacts__tab}>
          <ProfilePicture dp={profile_picture} />
        </div>  
        <div className={classes.profile_username__tab}>
          <h4>{first_name} { " " } {last_name} </h4>
        </div>  
        <Divider />
        <div className={classes.profile_info_detail__tab}>
          <div className={classes.follow_tab}>
            <h5>followers</h5>
            <h4>{followerCount}</h4>
          </div>
          <div className={classes.follow_tab}>
            {id !== user_profile_id?(
              <div style={{justifyContent:'center'}} onClick={()=>handleFollowbtn()}>
                <PermIdentity  style={isFollowing?{color:'blue'}:null, {fontSize:15}} />
              </div>):(
                <Settings />
              )}
          </div>
          
          <div className={classes.follow_tab}>
            <h5>following</h5>
            <h4>{following_count}</h4>
          </div>
          
        </div>
        <div className={classes.profile_info_detail__tab}>
          <div className={classes.follow_tab}>
            <h5>Photos</h5>
            
          </div>
          <div className={classes.follow_tab}>
            <h5>Videos</h5>
            
          </div>
          <div className={classes.follow_tab}>
            <h5>Views</h5>
            
          </div>
        </div>
        {id !== user_profile_id&&<div className={classes.profile_info_detail__tab}>
          <div className={classes.follow_tab}>
            <RecordVoiceOverOutlined />
            
          </div>
          <div onClick={()=>handleProfileTextButton()} className={classes.follow_tab}>
            <Telegram />
          </div>
        </div>}
    </Box>
  );
};

export default ProfileInfo;
