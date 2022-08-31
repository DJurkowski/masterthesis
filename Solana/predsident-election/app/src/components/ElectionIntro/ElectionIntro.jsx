import React from "react";
import { Box, Button, Link, Typography } from "@material-ui/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { electionIntroStyle } from './ElectionIntroStyle';

const useStyles = electionIntroStyle;

export default function ElectionIntro({
  votes,
  initializeElection,
  programID,
  voteAccount,
}) {
  const wallet = useWallet();
  const classes = useStyles();
  return (
    <Box textAlign="center">
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        className={classes.title}
      >
        President Elections
      </Typography>
      <Typography variant="body1">
        Choose your candidate
      </Typography>
      <Box marginTop="8px">
        {wallet.connected ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box className={classes.connectedBubble} />
            <Typography variant="body1" className={classes.connected}>
              Connected
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">
            Please, connect your wallet to enable voting option
          </Typography>
        )}
      </Box>
      {(typeof votes.candidateOneNumberOfVotes !== "number" ||
        typeof votes.candidateOneNumberOfVotes !== "number") &&
        wallet.connected && (
          <Box marginTop="8px">
            <Typography variant="body1">
              This{" "}
              <Link
                href={`https://explorer.solana.com/address/${programID.toString()}`}
                underline="always"
                style={{ color: "#ffffff" }}
              >
                program
              </Link>
              {"'s "}
              <Link
                href={`https://explorer.solana.com/address/${voteAccount?.toString()}`}
                underline="always"
                style={{ color: "#ffffff" }}
              >
                vote account
              </Link>{" "}
              has not been initialized yet:
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={initializeElection}
              className={classes.button}
            >
              Initialize Program
            </Button>
          </Box>
        )}
    </Box>
  );
}
