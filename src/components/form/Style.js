import { makeStyles } from "@material-ui/core/styles";
import { BaseColor, darkPrimary, darkSecondary, FacebookBlue, textDark } from "../../assets/Colors";

export default makeStyles((theme) => ({
  upload: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
    borderRadius: 10,
    backgroundColor: BaseColor,
    [theme.breakpoints.down("md")]: {
      width:"90%",
      margin:"0 auto",
      borderRadius: 10,
      marginBottom:10,
      border: 0,
      boxShadow: "none",
    },
  },
  upload__header: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent:"center"
  },
  header__form: {
    flex: 1,
    height: "50%",
    display: "flex",
    alignItems: "center",
    borderRadius: 900,
    backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
    overflow: "hidden",
    [theme.palette.type === "light"]: {},
    "& > textarea": {
      height: "100%",
      flex: 1,
      border: 0,
      outlineWidth: 0,
      paddingLeft: 15,
      color: theme.palette.type === "dark" && "lightgrey",
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: "transparent",
      "&::placeholder": {
        fontWeight: 600,
        fontSize: 15,
        color: theme.palette.type === "dark" && textDark,
        [theme.breakpoints.down("xs")]: {
          fontWeight: 600,
          fontSize: 12,
        },
      },
    },
    "& > button": {
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      border: 0,
      outlineWidth: 0,
      backgroundColor: theme.palette.type === "dark" ? "white" : "lightgrey",
      color: "black",
      cursor: "pointer",
      fontWeight: 600,
      [theme.breakpoints.down("xs")]: {
        fontSize: 14,
      },
      "&:hover": {
        backgroundColor: theme.palette.type === "dark" ? "lightgrey" : "white",
      },
    },
  },
  selectedFile: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
    paddingLeft: 52,
  },
  uploading: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    "& > p": {
      fontSize: 12,
      fontWeight: 600,
    },
  },
  progress: {
    flex: 1,
    height: 8,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
    "& > *": {
      backgroundColor: FacebookBlue,
    },
  },
  upload__media: {
    height: "50px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "2px 0",
  },
  media__options: {
    flex: 1,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 4,
    transition: "all 0.4s ease",
    "&:hover": {
      backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
    },
    "& > h4": {
      color: "white",
      marginLeft: 10,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
}));
