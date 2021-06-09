import React, {  useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReplyOutlinedIcon from "@material-ui/icons/ReplyOutlined";
import ReactPlayer from "react-player";
import ReactTimeago from "react-timeago";
import {profilePostsStyle as Style} from "./Style";
import { Box } from "@material-ui/core";
import { usePostsAction } from "../../Services/postService";
import { FavoriteOutlined } from "@material-ui/icons";

const PostLists = ({  profile, username, timestamp, description, image, id, likes, is_liked, profile_picture,post_profile_id }) => {
    const classes = Style();
    const postAction = usePostsAction();
    const [is_it_liked, setIsLiked] = useState(is_liked)
    const [likesCount, setLikesCount] = useState(likes);
    const [commentsCount, setCommentsCount] = useState(1);
    const [sharesCount, setSharesCount] = useState(1);
    const [likeIconOrder, setLikeIconOrder] = useState(1);
    const [loveIconOrder, setLoveIconOrder] = useState(1);
    const [careIconOrder, setCareIconOrder] = useState(1);

    useEffect(()=>{
      console.log(username, likes, "pp")
      setLikesCount(likes)
    },[])
    const handlePostAction = (action, id) =>{
      setIsLiked(!is_it_liked);
      postAction({action:action, id:id}).then(data=>{
        console.log(data, "act")
        setIsLiked(data.is_liked)
        setLikesCount(data.likes)
      })
    }
    
    const Reactions = () => {
      return (
        <div className={classes.footer__stats}>
          <div>
            <FavoriteIcon style={{color:'rgb(155, 68, 106)'}} />
          </div>
          <h4>{likesCount}</h4>
          <section>
            <h4>{commentsCount} Comments</h4>
            <h4>{sharesCount} Shares</h4>
          </section>
        </div>
      );
    };

    return (
      <Box boxShadow={3} className={classes.post}>
        <div className={classes.post__header}>
          <Avatar src={profile_picture} />
          <div className={classes.header__info}>
            <h4>{username}</h4>
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
            <div className={classes.action__icons} onClick={()=>handlePostAction('like', id)} >
              {is_it_liked?<FavoriteIcon style={{color:'rgb(155, 68, 106)'}} />:<FavoriteOutlined />}
            </div>
            <div className={classes.action__icons}>
              <ChatBubbleOutlineOutlinedIcon />
            </div>
            <div className={classes.action__icons}>
              <ReplyOutlinedIcon style={{ transform: "scaleX(-1)" }} />
            </div>
          </div>
        </div>
      </Box>
    );
  }

export default PostLists;
