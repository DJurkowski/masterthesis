import React from "react";
import { Button, Box } from "@material-ui/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { capitalize } from "../../utils/helpers";
import { voteOptionStyle } from './VoteOptionStyle';

const useStyles = voteOptionStyle;

export default function VoteOption({ side, isLeftSide, handleVote }) {
  const classes = useStyles();
  const wallet = useWallet();
  return (
    <Box textAlign="center">
      <Button
        variant="contained"
        onClick={() => handleVote(side)}
        disabled={!wallet.connected}
        size="large"
        color={isLeftSide ? "secondary" : "primary" }
        className={classes.button}
      >
        {`Vote for ${capitalize(side)}`}
      </Button>
    </Box>
  );
}
