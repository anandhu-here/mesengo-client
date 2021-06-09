import React, { useEffect, useState } from 'react';
import { Grid, Hidden, Paper, Divider } from "@material-ui/core";
import {profilePageStyle as Style} from "./Style";
import { useSelector } from 'react-redux';
import { lightPrimary } from "../../assets/Colors";
import { useprofilePosts } from '../../Services/postService';
import Posts from './Posts';
const Profile = ({id}) =>{
  const classes = Style();
  const mode = useSelector(state=>state.util);
  const [posts, setPosts] = useState([]);
  const getprofilePosts = useprofilePosts();
  
  useEffect(()=>{
    let _id = localStorage.getItem('current_profile_id');
    getprofilePosts(_id).then(data=>{
      setPosts(data.results)
      console.log(data, "test23")
    })

  },[])
  return(
    <Paper
        elevation={0}
        className={classes.root}
        style={{ backgroundColor: 'transparent' }}
      >
        <div style={{textAlign:'center', color:'white'}} ><h3>Recent Posts</h3></div>
        <Posts posts={posts} />
    </Paper>
  )
}

export default Profile;