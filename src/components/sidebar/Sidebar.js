import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Paper, Divider } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import InstagramIcon from "@material-ui/icons/Instagram";
import InfoBar from "../util/InfoBar";
import Style from "./Style";

const Sidebar = () => {
  const classes = Style();

  const [open, setOpen] = useState(false);

  const { last_name, first_name, email, id, profile_picture  } = useSelector((state) => state.user);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <Paper elevation={0} className={classes.sidebar}>
      <Scrollbars autoHide autoHideDuration={200}>
        {/* User info */}
        <InfoBar key={first_name} Source={<Avatar src={profile_picture} />} title={first_name} id={id} />
        {/* Top item */}
        
      </Scrollbars>
    </Paper>
  );
};

const author = [
  { src: <InstagramIcon />, url: "https://www.instagram.com/_anandhu_satheesh/" },
];



const yourLinks = [
  
];

export default Sidebar;
