import { makeStyles } from "@material-ui/core/styles";
import { BaseColor, darkSecondary, lightPrimary } from "../../assets/Colors";

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    width: "100%",
    height:'auto',
    borderRadius: 0,
    backgroundColor: theme.palette.type === "light" && lightPrimary
  },
  m_root:{
    height:'calc(100vh - 70px)'
  },
  search_container:{
    display: 'flex',
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
    settayi__search: {
        display:'flex',
        width:'100%',
        height:'40px',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
        borderRadius: 999,
        "& > input": {
          outlineWidth: 0,
          border: 0,
          width:'80%',
          backgroundColor: theme.palette.type === "dark" ? darkSecondary : "lightgrey",
          color: theme.palette.type === "dark" && "lightgrey",
          "&::placeholder": {
            color: theme.palette.type === "dark" && "lightgrey",
          },
          "&:focus":{
            outline:"none",
            border:"none"
          }
        },
      },
      results_container:{
        height: 'fit-content',
        [theme.breakpoints.down("md")]: {
          maxHeight: "70vh",
        },
        overflowX:'hidden',
        scrollbarColor:BaseColor,
        scrollbarWidth:'thin',
        width:'100%',
        marginInline:'auto',
        borderRadius:5,
        backgroundColor:darkSecondary,
        color:'white',
        paddingInline:2,
        paddingBlock:1,
      },
      search_items:{
        display: 'flex',
        alignItemsL:'center',
        cursor:'pointer',
        transition: "all 0.5s ease",
        "& > p":{
          marginLeft:5
        },
        "&:hover": {
          backgroundColor: theme.palette.type === "dark" ? "lightgrey" : darkSecondary,
          transform: "scale(1.02)",
        },
      }
}))