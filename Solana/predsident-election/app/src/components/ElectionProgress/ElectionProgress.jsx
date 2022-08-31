import React from "react";
import {
  Box,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { formatWithCommas, percentize } from "../../utils/helpers";
import { electionProgressStyle } from './ElectionProgressStyle';

const useStyles = electionProgressStyle;

// Show vote counts for each side
export default function ElectionProgress({ votes }) {
  const classes = useStyles();

  function getProgress() {
    if (
      typeof votes.candidateOneNumberOfVotes !== "number" ||
      typeof votes.candidateTwoNumberOfVotes !== "number" ||
      votes.candidateOneNumberOfVotes + votes.candidateTwoNumberOfVotes === 0
    ) {
      return 50;
    }
    return (votes.candidateOneNumberOfVotes / (votes.candidateTwoNumberOfVotes + votes.candidateOneNumberOfVotes)) * 100;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom="5px">
        <Box display="flex" alignItems="flex-end">
          <Typography variant="h6">CandidateOne</Typography>
        </Box>
        <Box display="flex" alignItems="flex-end" textAlign="right">
          <Typography variant="h6">CandidateTwo</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">
            {formatWithCommas(votes.candidateOneNumberOfVotes)}
          </Typography>
          <Typography variant="h6">
            {percentize(votes.candidateOneNumberOfVotes / (votes.candidateOneNumberOfVotes + votes.candidateTwoNumberOfVotes))}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="h3">{formatWithCommas(votes.candidateTwoNumberOfVotes)}</Typography>
          <Typography variant="h6">
            {percentize(votes.candidateTwoNumberOfVotes / (votes.candidateOneNumberOfVotes + votes.candidateTwoNumberOfVotes))}
          </Typography>
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={getProgress()}
        color="secondary"
        className={classes.progress}
      />
    </Box>
  );
}
