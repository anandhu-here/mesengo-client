import React, { Component, useEffect, useState } from 'react'
import Paper from "@material-ui/core/Paper";
import { Avatar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { Phone } from '@material-ui/icons';

const Style = makeStyles((theme) => ({
    
    text_right:{
        display: 'flex',
        width:'100%',
        alignItems:'center',
        marginBottom:10,
        marginRight:10,
        "& > .text_container":{
            width: '70%',
            display: 'flex',
            marginLeft:'auto',
            backgroundColor:'#EDECEC',
            justifyContent:'flex-end',
            borderRadius:20,
        },
    },
    text_left:{
        display: 'flex',
        width: '100%',
        alignItems:'center',
        marginBottom:10,
        marginLeft:10,
        "& > .text_container":{
            display: 'flex',
            width: '70%',
            flexDirection:'row-reverse',
            justifyContent:'flex-end',
            backgroundColor:'#383838',
            color:'white',
            borderRadius:20,
        },
    },
    chat_body:{
        width:'100%',
        height:'80%',
    }
}))
export const Messages = ({sender, reciever, message, timestamp}) => {
    const classes = Style();
    const {other_user, id, other_profile_picture} = useSelector(state=>state.chat);
    const {token, first_name, profile_picture} = useSelector(state=>state.user);
    useEffect(()=>{
        console.log(other_user, first_name, "123")
    },[])
    return (
        <Paper elevation={0} className={sender===first_name?classes.text_right:classes.text_left}>
            <div className="text_container">
                <p>{message}</p>
                <Avatar src={sender === first_name?profile_picture:other_profile_picture} style={{width:'40px', height:'40px', alignSelf:'center'}} />
            </div>
        </Paper>
    )
}

export default Messages
