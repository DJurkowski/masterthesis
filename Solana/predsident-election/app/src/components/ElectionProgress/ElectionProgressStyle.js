import { makeStyles } from "@material-ui/core";

export const electionProgressStyle = makeStyles((theme) => ({
    avatar: {
      height: 48,
      width: 48,
      borderRadius: "initial",
      "&.left": {
        marginRight: theme.spacing(0.5),
      },
      "&.right": {
        marginLeft: theme.spacing(0.5),
      },
    },
    progress: {
      backgroundColor: theme.palette.primary.main,
      height: 25,
    },
}));