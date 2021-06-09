import React, { useState, useEffect } from "react";
import { Avatar, Tooltip, Paper, Divider } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import InfoBar from "../util/InfoBar";
import Style from "./Style";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ContactList from "./ContactList";

const Contacts = () => {
  const classes = Style();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const {token, first_name} = useSelector(state=>state.user);
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
            
            console.log(data_json, "l")
            setUsers(data_json);
            
          })
        }
      })
    };
    fetchUsers();
  }, []);
  

  return (
    <Paper elevation={0} className={classes.contacts}>
      <Scrollbars autoHide autoHideDuration={200}>
        
        <div className={classes.contacts__tab}>
          <h4>Recent Chats</h4>
          <SearchIcon />
          <MoreHorizIcon />
        </div>
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
            profile_id={user.profile_id}
          />
        ))}
      </Scrollbars>
    </Paper>
  );
};

export default Contacts;
