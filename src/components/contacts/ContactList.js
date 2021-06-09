import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { darkSecondary } from "../../assets/Colors";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ContactList = ({ Source, title,profile_id, onClick,id, noTransform, lastSeen, online, profile_picture }) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const Style = makeStyles((theme) => ({
    infobar: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 8,
      margin: "8 0",
      cursor: "pointer",
      borderRadius: 12,
      transition: "all 0.5s ease",
      "& > h4": {
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "center",
        marginLeft: 8,
      },
      "&:hover": {
        backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
        transform: noTransform ? "" : "scale(1.02)",
      },
    },
    infobar__source: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    },
    online: {
      position: "absolute",
      bottom: -3,
      right: lastSeen ? -3 : 0,
      transition: "all 0.5s ease",
      "& > .MuiSvgIcon-root": {
        borderRadius: 999,
        backgroundColor: "black",
        color: "#56c700",
        fontSize: 10,
      },
    },
    lastSeen: {
      borderRadius: 999,
      padding: "0 5px",
      backgroundColor: "black",
      color: "#56c700",
      fontSize: 10,
      fontWeight: 800,
    },
  }));
  const {token} = useSelector(state=>state.user);
  const handleProfile = () => {
    dispatch({type:"CHAT_USER_LOADED",payload:{other_user:title, id:id,profile_id:profile_id, other_profile_picture:profile_picture}})
    dispatch({type:"CHAT_OPEN", payload:{}})
  }
  // const handleProfile = (id) =>{
  //   dispatch({type:'CHAT_OPEN'})
  //   fetch(`/api/messenger/chat?id=${id}`, {
  //     method:"GET",
  //     headers:{
  //       'Authorization':`Token ${token}`
  //   }
  //   }).then(res=>{
  //     if(res.ok){
  //       res.text().then(data=>{
  //         dispatch({type:"CHAT_LOADED",payload:JSON.parse(data)})
  //       })
  //     }
  //   })
  // }
  const {user_profile_id} = useSelector(state=>state.user);
  const classes = Style();
  return (
    <div className={classes.infobar} onClick={()=>handleProfile(id)} >
      <div className={classes.infobar__source}>
        {Source}
        {online && (
          <div className={classes.online}>
            {lastSeen ? (
              <div className={classes.lastSeen}>{lastSeen}</div>
            ) : (
              <FiberManualRecordIcon />
            )}
          </div>
        )}
      </div>
      <h4>{title}</h4>
    </div>
  );
};

export default ContactList;
