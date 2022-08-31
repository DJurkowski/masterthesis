import React from "react";
import { Box, Link, List, ListItem, Typography } from "@material-ui/core";

// If this user has voted during this session, show them their transaction history
export default function ElectionHistory({ electionTxHistory }) {
  if (electionTxHistory.length < 1) {
    return <Box />;
  }
  return (
    <Box textAlign="center" marginTop="16px">
      <Typography variant="h4">Voted Successfully!</Typography>
      <Typography variant="body1">
        Check out your recorded {electionTxHistory.length === 1 ? "vote" : "votes"}{" "}
        on the Solana blockchain:
      </Typography>
      <List>
        {electionTxHistory.map((ID, i) => (
          <ListItem key={ID} style={{ justifyContent: "center" }}>
            <Link
              underline="always"
              href={`https://explorer.solana.com/tx/${ID}?cluster=devnet`}
              style={{ color: "#ffffff" }}
            >{`Number of vote ${i + 1}`}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
