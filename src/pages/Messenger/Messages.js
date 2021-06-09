import React, { Component, useEffect, useState } from 'react'
import Paper from "@material-ui/core/Paper";
import { Avatar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { Phone } from '@material-ui/icons';
import { BaseColor, darkSecondary } from '../../assets/Colors';

const Style = makeStyles((theme) => ({
    
    text_right:{
        display: 'flex',
        width:'100%',
        marginBottom:5,
        "& > .main_container":{
            display:'flex',
            flexDirection:'row-reverse',
            width: '70%',
            marginLeft:'auto',
            borderRadius:20,
            "& > .text_container":{
                display: 'flex',
                backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
                justifyContent:'flex-end',
                marginRight:4,
                borderRadius:15,
                borderTopRightRadius:0,
                padding: 5,
            },
        },
        
    },
    
    text_left:{
        display: 'flex',
        width: '100%',
        marginBottom:5,
        "& > .main_container":{
            display:'flex',
            width: '70%',
            color:'white',
            borderRadius:20,
            "& > .text_container":{
                display: 'flex',
                backgroundColor:BaseColor,
                flexDirection:'row-reverse',
                justifyContent:'flex-end',
                marginLeft:4,
                borderRadius:15,
                borderTopLeftRadius:0,
                padding: 5,
            },
        },
        
    },
    
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
            <div className="main_container">
                <Avatar src={sender === first_name?profile_picture:other_profile_picture} style={{width:'25px', height:'25px'}} />  
                <div className="text_container">
                    <p style={{margin:0}}>{message}</p>
                </div>
                
            </div>
        </Paper>
    )
}

export default Messages
