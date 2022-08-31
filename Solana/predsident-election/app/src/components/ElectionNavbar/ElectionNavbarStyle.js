import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

export const electionNavbarStyle = makeStyles((theme) => ({
    root: {
      backgroundColor: "transparent",
      boxShadow: "none",
      marginTop: "10px",
    },
    toolbar: {
      justifyContent: "space-between",
    },
    link: {
        fontSize: "14px",
        fontWeight: 500,
        color: "#ffffff",
        marginTop: "10px",
        background: red[300],
        borderRadius: "5px",
        padding: "12px 16px",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "#a05050d9",
        }
    }
}));