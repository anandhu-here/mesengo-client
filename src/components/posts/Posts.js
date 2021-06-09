import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlipMove from "react-flip-move";
import Post from "./post/Post";
import { usefeedPosts } from "../../Services/postService";
import { useSelector } from "react-redux";

const Posts = () => {
  const classes = Style();
  const post = useSelector(state=>state.post)
  const [posts, setPosts] = useState([]);
  const getFeedPosts = usefeedPosts();
  useEffect(() => {
    getFeedPosts().then(data=>{
      setPosts(data.results)
    })
  }, []);
  useEffect(()=>{
    setPosts(prevPosts=>[{...post},...prevPosts])
  },[post])

  return (
    <div className={classes.posts}>
      <div style={{ width: "100%" }}>
        {Array.from(posts).map((post) => (
          <Post
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
      </div>
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
  },
}));

export default Posts;
