import React, { Component, useEffect, useState } from 'react'
import Paper from "@material-ui/core/Paper";
import { Avatar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ArrowLeftRounded, Phone, Send, SendRounded } from '@material-ui/icons';
// import Messages from './Messages';
import socketIOClient from "socket.io-client";
import { BaseColor, darkPrimary, darkSecondary, lightPrimary } from '../../assets/Colors';
import { useHistory } from 'react-router';
import Messages from './Messages';
import { useSendConversationMessage } from '../../Services/chatService';

const URL = 'https://settayi-messenger.herokuapp.com'


const Style = makeStyles((theme) => ({
    chat_root:{
        width:'100%',
        height:'calc(100vh - 150px)',
        display:'flex',
        flexDirection:'column',
        
    },
    chat_header:{
        display: 'flex',
        justifyContent:'space-between',
        alignItems:'center',
        height:'7%',
        padding: 5,
        backgroundColor: theme.palette.type === "dark" ? BaseColor : "lightgrey",
        color:'black',
        "& > h4":{
            color:'black',
        },
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
    chat_header_left:{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        "& > h4":{
            color: theme.palette.type === "dark" ? "white" : darkPrimary,
        }
    },
    chat_header_right:{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        
    },
    chat_body:{
        display: 'flex',
        flexDirection:'column-reverse',
        height:'83%',
        width: '100%',
        overflowY:'scroll',
        backgroundColor:'inherit'
    },
    chat_input:{
        display: 'flex',
        height:'10%',
        backgroundColor: theme.palette.type === "dark" ? "inherit" : "lightgrey",
        
    },
    form:{
        width:'100%',
        height: '90%',
        marginBlock:'auto',
        backgroundColor:'inherit',
        padding:4,
        zIndex:1000,
        color: "white",
        "& > input":{
            backgroundColor:'white',
            width:'100%',
            height:'100%',
            border:'none',
            outline:'none'
        },
    }
}))
export const Messenger = ({profile_id}) => {
    const classes = Style();
    const {other_user, id, profile_picture} = useSelector(state=>state.chat);
    const {token, first_name} = useSelector(state=>state.user);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [recieved, setRecieved] = useState(false);
    const [seen, setSeen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const sendMessages = useSendConversationMessage();
    const handleInputText = (e) =>{
        setInputText(e.target.value)
    }
    useEffect(() => {
        setLoading(true);
        fetch(`/api/messenger/chat?id=${id}&profile_id=${profile_id}`, {
            method:"GET",
            headers:{
              'Authorization':`Token ${token}`
          }
          }).then(res=>{
            if(res.ok){
            setLoading(false)
              res.text().then(data=>{
                setMessages(JSON.parse(data))
              })
            }
            else setLoading(false)
          }).catch(e=>{
              setLoading(false)
          })
        return () => {
            
        }
    }, [])
    useEffect(() => {
        let socket = socketIOClient(URL);
        socket.on("messages", (data) => {
            var socket_data = JSON.parse(data);
            if( socket_data.sender === other_user ){
                setMessages(prevState=>[{...socket_data}, ...prevState ])
                setRecieved(true);
            }
            
        });
        return () => {
          socket.removeListener("messages");
        };
    }, []);
    useEffect(()=>{
        return ()=>{
            dispatch({type:"CHAT_USER_DESELECTED"})
            
            localStorage.removeItem('current_chat_id');
        }
    },[])
    const handleSentMessage = (e) =>{
        e.preventDefault();
        console.log(inputText.length, "len")
        
        if(inputText){
            setInputText("");
            setMessages(prevState=>[{sender:first_name, reciever:other_user, message:inputText, timestamp:Date.now()}, ...prevState ])
            sendMessages({conver_id:id, message:inputText, profile_id:profile_id}).then(data=>{
                fetch(`${URL}/api/messenger/create`, {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Token ${token}`
                    },
                    body:JSON.stringify(data)
                }).then(res=>console.log(res.status)).catch(e=>console.log(e))
            })
        }
        else{
            setInputText("");
        }
    }
    useEffect(()=>{
        return ()=>{
            dispatch({type:"CHAT_USER_DESELECTED"})
        }
    },[])
    return (
        <Paper className={classes.chat_root}>
            <Paper className={classes.chat_header}>
                <div className={classes.chat_header_left}>
                    <div className="left_arrow" onClick={()=>dispatch({type:"CHAT_CLOSE"})}>
                        <ArrowLeftRounded style={{color:BaseColor}} />
                    </div>
                    <h4>{other_user}</h4>
                </div>
                <div className={classes.chat_header_right}>
                    
                    <Phone />
                </div>
            </Paper>
            {!loading?(<Paper className={classes.chat_body}>
                {messages.length>0?(messages.map(text=>( 
                    <Messages sender={text.sender} reciever={text.reciever} timestamp={text.timestamp} message={text.message} />        
                ))):(
                    <div className={classes.chat_new}>
                        <p>You are just about to start a new conversation with {other_user} </p>
                        <p>Be nice</p>
                    </div>
                )}
            </Paper>):(
                <Paper className={classes.chat_body}>
                    <div>Loading.....</div>
                </Paper>
            )}
            <div className={classes.chat_input}>
                <form className={classes.form} onSubmit={handleSentMessage}>
                    <input placeholder="Type in" value={inputText} onChange={handleInputText} />
                    {/* <div onClick={() =>handleSentMessage()} className="inputBtn">
                        <SendRounded style={{color:BaseColor}} />
                    </div> */}
                </form>
            </div>
        </Paper>
    )
}

export default Messenger
