import { makeStyles } from "@material-ui/styles";

export const voteOptionStyle = makeStyles((theme) => ({
    button: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      fontSize: "1.2rem",
      "&:disabled": {
        background: "#343a40",
      },
      "&:hover": {
        "&:disabled": {
          background: "#343a40",
        },
      },
    },
}));