import React, {  useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReplyOutlinedIcon from "@material-ui/icons/ReplyOutlined";
import ReactTimeago from "react-timeago";
import Style from "./Style";
import { usePostsAction } from '../../../Services/postService';
import { FavoriteOutlined } from "@material-ui/icons";
import { useHistory } from "react-router";

const Post = ({ profile, username, timestamp, description, image, id, likes, is_liked, profile_picture,post_profile_id }) => {
    const classes = Style();
    const [is_it_liked, setIsLiked] = useState(is_liked)
    const [likesCount, setLikesCount] = useState(likes);

    
    const history = useHistory();
    const Reactions = () => {
      return (
        <div className={classes.footer__stats}>
          <div>
            <FavoriteIcon style={{color:'rgb(155, 68, 106)'}} />
          </div>
          <h4>{likesCount}</h4>
          
        </div>
      );
    };
    const postAction = usePostsAction();
  
    const handlePostAction = (action, id) =>{
      setIsLiked(!is_it_liked);
      postAction({action:action, id:id}).then(data=>{
        setIsLiked(data.is_liked)
        setLikesCount(data.likes)
      })
    }
    const handleProfileRoute = (id) =>{
      localStorage.setItem('current_profile_id', id);
      history.push({
        pathname:`/${username}`,
        state:{id:id}
      })
    }
    return (
      <Box boxShadow={15} className={classes.post}>
        <div className={classes.post__header}>
          <Avatar src={profile_picture} onClick={() =>handleProfileRoute(post_profile_id)} />
          <div className={classes.header__info}>
            <h4 onClick={() =>handleProfileRoute(post_profile_id)}>{username}</h4>
            <p>
              <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} units="minute" />
            </p>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className={classes.post__body}>
          <div className={classes.body__description}>
            <p>{description}</p>
          </div>
          {image && (
            <div className={classes.body__image}>
              <img src={image} alt="post" />
              {/* {fileType === "image" ? (
                <img src={fileData} alt="post" />
              ) : (
                <ReactPlayer url={fileData} controls={true} />
              )} */}
            </div>
          )}
        </div>
        <div className={classes.post__footer}>
          <Reactions />
          <div className={classes.footer__actions}>
            <div className={classes.action__icons} onClick={()=>handlePostAction('like', id)}>
              {is_it_liked?<FavoriteIcon style={{color:'rgb(155, 68, 106)'}} />:<FavoriteOutlined />}
            </div>
            <div className={classes.action__icons} onClick={()=>handlePostAction('comment', id)}>
              <ChatBubbleOutlineOutlinedIcon />
            </div>
            <div onClick={()=>handlePostAction('share', id)} className={classes.action__icons}>
              <ReplyOutlinedIcon style={{ transform: "scaleX(-1)" }} />
            </div>
          </div>
        </div>
      </Box>
    );
  }


export default Post;
