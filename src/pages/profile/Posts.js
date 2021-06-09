import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlipMove from "react-flip-move";
import PostLists from "./PostLists";

const Posts = ({posts}) => {
  const classes = Style();
  useEffect(()=>{
    console.log(posts);
  },[])
  return (
    <div className={classes.posts}>
      <FlipMove style={{ width: "100%" }}>
        {Array.from(posts).map((post) => (
          <PostLists
          key={post.id}
          id={post.id}
          // profile={post.data.profile}
          username={post.user}
          // timestamp={Date.now()}
          image={post.image}
          description={post.content}
          likes={post.likes}
          is_liked = {post.is_liked}
          profile_picture = {post.profile_picture}
          post_profile_id = {post.post_profile_id}
          />
        ))}
      </FlipMove>
    </div>
  );
};

const Style = makeStyles((theme) => ({
  posts: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:'transparant',
  },
}));

export default Posts;
