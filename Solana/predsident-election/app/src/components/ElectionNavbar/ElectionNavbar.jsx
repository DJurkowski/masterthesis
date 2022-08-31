import React from "react";
import { AppBar, Box, Container, Toolbar, Link } from "@material-ui/core";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { electionNavbarStyle } from './ElectionNavbarStyle';

const useStyles = electionNavbarStyle;

export default function ElectionNavbar({ voteAccount }) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar}>
          <img src="/images/voting-box.png" alt="President Election" height={40} />
          <Box display="flex" flexDirection="column">
            <WalletMultiButton />
            <Link
              className={classes.link}
              underline="always"
              href={`https://explorer.solana.com/address/${voteAccount?.toString()}?cluster=devnet`}
              aria-label="Show Solana transactions history"
            >
              Show history
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
