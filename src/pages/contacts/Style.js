import { makeStyles } from "@material-ui/core/styles";
import { lightPrimary } from "../../assets/Colors";

export default makeStyles((theme) => ({
  contacts: {
    width: "100%",
    height: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.type === "light" && "yellow",
  },
  contacts__tab: {
    display: "flex",
    alignItems: "center",
    "& > h4": {
      flex: 1,
    },
    "& > .MuiSvgIcon-root": {
      cursor: "pointer",
    },
  },
  contact__scroll_div:{
    height:'100%',
    width: "100%",
    overflowY:'auto'
  }
}));
