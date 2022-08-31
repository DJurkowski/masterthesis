import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

export const electionIntroStyle = makeStyles((theme) => ({
    button: {
      marginTop: theme.spacing(1),
      "&.hidden": {
        visibility: "hidden",
      },
    },
    connected: {
      color: green[500],
    },
    connectedBubble: {
      backgroundColor: green[500],
      height: 12,
      width: 12,
      borderRadius: "50%",
      marginRight: theme.spacing(0.5),
    },
    title: {
      fontWeight: 700,
    },
}));