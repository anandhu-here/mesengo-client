import React, { Component, useEffect, useState } from 'react'
import Paper from "@material-ui/core/Paper";
import { Avatar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Phone, Send, SendRounded } from '@material-ui/icons';
import Messages from './Messages';
import socketIOClient from "socket.io-client";

const URL = 'https://settayi-messenger.herokuapp.com'


const Style = makeStyles((theme) => ({
    chat_root:{
        width:'30%',
        height:'90vh',
        backgroundColor:'transparant', 
        [theme.breakpoints.down("md")]: {
            width: "60%",
        },
        [theme.breakpoints.down("sm")]: {
            "& > .left_arrow":{
                display: 'flex',
            },
            width: "100%",
            height:"100vh"
        },
    },
    chat_header:{
        display: 'flex',
        justifyContent:'start',
        alignItems:'center',
        height:'10%',
        backgroundColor:'white',
        "& > .left_arrow":{
            display: 'none',
        },
        [theme.breakpoints.down("md")]: {
            "& > .left_arrow":{
                display: 'none',
            },
        },
        [theme.breakpoints.down("sm")]: {
            "& > .left_arrow":{
                display: 'flex',
            },
        },

    },
    chat_body:{
        display: 'flex',
        flexDirection:'column-reverse',
        height:'80%',
        overflowY:'scroll'
    },
    chat_input:{
        display: 'flex',
        height:'10%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        "& > input":{
            backgroundColor:'white',
            width:'90%',
            height:'80%',
            border:'none',
            outline:'none'
        },
        "& > .inputBtn":{
            display: 'flex',
            width:'10%',
            height:'100%',
            alignItems:'center',
            justifyContent:'center'
        },
    },
}))
export const ChatBox = () => {
    const classes = Style();
    const {other_user, id} = useSelector(state=>state.chat);
    const {token} = useSelector(state=>state.user);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(other_user);
    },[other_user])
    const handleInputText = (e) =>{
        setInputText(e.target.value)
    }
    useEffect(() => {
        fetch(`/api/messenger/chat?id=${id}`, {
            method:"GET",
            headers:{
              'Authorization':`Token ${token}`
          }
          }).then(res=>{
            if(res.ok){
              res.text().then(data=>{
                setMessages(JSON.parse(data))
              })
            }
          })
        return () => {
            
        }
    }, [])
    useEffect(() => {
        let socket = socketIOClient(URL);
        socket.on("messages", (data) => {
            var socket_data = JSON.parse(data);
            setMessages(prevState=>[{...socket_data}, ...prevState ])
        });
        return () => {
          socket.removeListener("messages");
        };
    }, []);
    
    const handleSentMessage = () =>{
        if(inputText){
            fetch(`/api/messenger/create_message`, {
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`
                },
                body:JSON.stringify({
                    reciever:other_user,
                    message:JSON.stringify(inputText),
                    conver_id:id
                })
            }).then(res=>{
                if(res.ok){
                    res.text().then(data=>{
                        var text_data = JSON.parse(data);
                        fetch(`${URL}/api/messenger/create`, {
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json',
                                'Authorization':`Token ${token}`
                            },
                            body:JSON.stringify(text_data)
                        })
                    })
                }
            }).catch(e=>console.log(e))
        }
    }
    return (
        <Paper className={classes.chat_root}>
            <Paper className={classes.chat_header}>
                <div className="left_arrow" onClick={()=>dispatch({type:"CHAT_CLOSE"})}>
                    <ArrowLeft />
                </div>
                <Avatar src={""} />
                <h4>{other_user}</h4>
                <Phone />
            </Paper>
            <Paper className={classes.chat_body}>
                {messages.map(text=>( 
                    <Messages sender={text.sender} reciever={text.reciever} timestamp={text.timestamp} message={text.message} />        
                ))}
            </Paper>
            <div className={classes.chat_input}>
                <input placeholder="Type in" value={inputText} onChange={handleInputText} />
                <div onClick={() =>handleSentMessage()} className="inputBtn">
                    <SendRounded />
                </div>
            </div>
        </Paper>
    )
}

export default ChatBox
