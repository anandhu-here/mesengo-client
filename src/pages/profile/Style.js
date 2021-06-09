import { makeStyles } from "@material-ui/core/styles";
import { darkSecondary, darkPrimary, textDark } from "../../assets/Colors";

import { lightPrimary } from "../../assets/Colors";

export const profilePageStyle =  makeStyles((theme) => ({
  root: {
    width: "100%",
    height:"calc(100vh - 50px)",
    borderRadius: 0,
  },
  app__header: {
    height: "8vh",
    borderBottom: "1px solid rgba(212, 212, 212,0.2)",
    zIndex: 100,
  },
  app__body: {
    display: "flex",
    height: '100%',
    position: "relative",
    justifyContent: "center",
    backgroundColor: theme.palette.type === "light" && lightPrimary,
    [theme.breakpoints.down("sm")]: {
      
      backgroundColor: theme.palette.type === "light" && lightPrimary,
    },
  },
  body__left: {
    width: "100%",
    height: "100%",
  },
  body__feed: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "flex-start",
    overflowY: "scroll",
    
    "&::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  },

  feed__stories: {
    width: "85%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    height: "220px",
    overflow: "hidden",
  },

  feed__form: {
    width: "85%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    height: "auto",
  },

  feed__posts: {
    width: "100vh",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    paddingBottom: 10,
  },
  body__right: {
    position:'relative',
    width: "100%",
    height: "100%",
  },
}));

export const useProfilePictureStyles = makeStyles({
  person: {
    color: "#ffffff",
    height: ({ size = 150 }) => size,
    width: ({ size = 150 }) => size,
  },
  wrapper: {
    background: "#DBDBDB",
    width: ({ size = 150 }) => size,
    height: ({ size = 150 }) => size,
    borderRadius: "50%",
    display: "grid",
    position: "relative",
    placeItems: "center",
    "&:hover": {
      cursor: ({ isOwner }) => (isOwner ? "pointer" : "default"),
    },
  },
  section: {
    display: "grid",
    justifyContent: "center",
  },
  image: {
    height: ({ size = 150 }) => size,
    width: ({ size = 150 }) => size,
    borderRadius: "50%",
  },
});

// EditProfilePage: /pages/edit-profile.js
const sectionItem = {
  display: "grid",
  gridAutoFlow: "column",
  gridGap: 30,
  placeItems: "start end",
  marginBottom: 16,
  gridTemplateColumns: "minmax(auto, 150px) minmax(auto, 340px)",
};
const typography = {
  fontWeight: "600 !important",
};
const justifySelfStart = {
  justifySelf: "start",
};
const form = {
  display: "grid",
};


export const profileInfoStyle = makeStyles((theme) => ({
  profile_box: {
    width: "100%",
    height: "85%",
    borderRadius:10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBlock:'auto',
    backgroundColor: theme.palette.type === "light" && lightPrimary,
  },
  profile_username__tab:{
    display: "flex",
    alignItems: "center",
    justifyContent:'center',
    textAlign:'center',
    padding:10,
    "& > h4": {
      flex: 1,
    },
    "& > .MuiSvgIcon-root": {
      
      cursor: "pointer",
    },
  },
  follow_tab:{
    display:"flex",
    flexDirection:'column',
    textAlign:'center',
    cursor: 'pointer',
    transition: "all 0.4s ease",
    padding: 8,
    borderRadius:10,
    "& > h4, h5": {
      margin:0,
    },
    "&:hover": {
      backgroundColor: theme.palette.type === "dark" ? "lightgrey" : "grey",
    },
  },
  profile_info_detail__tab: {
    display: "flex",
    width: '90%',
    alignItems: "center",
    justifyContent:'space-between',
    padding:10,
    marginTop:10,
    "& > h4": {
      flex: 1,
    },
    "& > .MuiSvgIcon-root": {
      
      cursor: "pointer",
    },
  },
}));

export const profilePostsStyle =  makeStyles((theme) => ({
  post: {
    width: "70%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
    borderRadius:5,
    padding: 8,
    marginInline:'auto',
    backgroundColor: theme.palette.type === "dark" ? darkPrimary : "white",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      marginInline:"auto",
      borderRadius: 10,
      border: 0,
      boxShadow: "none",
    },
  },

  post__header: {
    width: "95%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    
    "& > .MuiAvatar-root": {
      cursor: "pointer",
    },
    "& > .MuiSvgIcon-root": {
      color: theme.palette.type === "dark" ? textDark : "grey",
      cursor: "pointer",
      borderRadius: 999,
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "grey",
      },
    },
  },

  header__info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
    "& > h4": {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 3,
    },
    "& > p": {
      color: "grey",
      fontSize: 12,
    },
  },

  post__body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  body__description: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    paddingTop: 5,
  },

  body__image: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    "& > img": {
      width: "100%",
      height: "auto",
      objectFit: "contain",
      transition: "all 0.5s ease",
      "&:hover": {
        transform: "scale(1.1)",
        [theme.breakpoints.down("xs")]: {
          transform: "scale(1.0)",
        },
      },
    },
  },

  post__footer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    paddingBottom: 0,
  },

  footer__stats: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
    paddingInline:30,
    borderBottom: `1px solid ${theme.palette.type === "dark" ? darkSecondary : "lightgrey"}`,

    "& > div": {
      display: "flex",
      "& > img": {
        width: 18,
        height: 18,
      },
    },

    "& > h4": {
      flex: 1,
      color: theme.palette.type === "dark" && textDark,
      fontSize: 14,
      marginLeft: 5,
      fontWeight: 500,
    },

    "& > section": {
      display: "flex",
      alignItems: "center",

      "& > h4": {
        color: theme.palette.type === "dark" && textDark,
        fontSize: 13,
        marginLeft: 10,
        fontWeight: 500,
      },
    },
  },

  footer__actions: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 4,
  },

  action__icons: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    padding: "5px 0",
    borderRadius: 4,
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: theme.palette.type === "dark" ? "lightgrey" : darkSecondary,
    "&:hover": {
      backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
    },
    [theme.breakpoints.down("xs")]: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    "& > .MuiSvgIcon-root": {
      color: theme.palette.type === "dark" && textDark,
      [theme.breakpoints.down("xs")]: {
        fontSize: 16,
      },
    },
    "& > h4": {
      color: theme.palette.type === "dark" && textDark,
      marginLeft: 4,
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
      },
    },
  },
}));