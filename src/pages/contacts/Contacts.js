import React, { useState, useEffect } from "react";
import { Avatar, Tooltip, Paper, Divider } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Style from "./Style";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ContactList from "./ContactList";
import Messenger from './Messenger/Chat';
const Contacts = () => {
  const classes = Style();

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const {token, first_name} = useSelector(state=>state.user);
  const chat = useSelector(state=>state.chat)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      fetch('/api/messenger/', {
        method:"GET",
        headers:{
          'Authorization':`Token ${token}`
      }
      }).then(res=>{
        if(res.ok){
          res.text().then(data=>{
            let data_json = JSON.parse(data)
            setUsers(data_json);
            
          })
        }
      })
    };
    fetchUsers();
  }, []);
  useEffect(()=>{
    if(chat.is_open){
      setOpen(true);
    }
    else setOpen(false)
  },[chat])
  
  return (
    <Paper elevation={0} className={classes.contacts}>
      <Messenger open={open} />
      <div className={classes.contact__scroll_div}>
      {users.map(({ user, id }) => (
          <ContactList
            key={id}
            onClick={()=>handleChat(id)}
            Source={
              <Tooltip placement="left" title={user.name} arrow>
                <Avatar src={user.profile_picture} size={100} />
              </Tooltip>
            }
            title={user.name}
            online={true}
            id={id}
            lastSeen={
              Math.floor(Math.random() * (3 - 1 + 1)) + 1 === 2 &&
              `${Math.floor(Math.random() * 10) + 1} h`
            }
            noTransform={true}
            profile_picture={user.profile_picture}
          />
        ))}
      </div>
    </Paper>
  );
};

export default Contacts;
