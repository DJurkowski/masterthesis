import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import ElectionNavbar from "../ElectionNavbar/ElectionNavbar";
import { Box, Container, Grid } from "@material-ui/core";
import ElectionIntro from "../ElectionIntro/ElectionIntro";
import { useSnackbar } from "notistack";
import idl from "../../idl.json";
import VoteOption from "../VoteOption/VoteOption";
import { preflightCommitment, programID } from "../../utils/config";
import { capitalize } from "../../utils/helpers";
import ElectionProgress from "../ElectionProgress/ElectionProgress";
import ElectionHistory from "../ElectionHistory/ElectionHistory";
import { Connection, PublicKey } from "@solana/web3.js";
import ElectionForm from "../ElectionForm/ElectionForm";
import ElectionModalButton from "../ElectionModalButton/ElectionModalButton";

const propTypes = {};

const defaultProps = {};

export default function ElectionMain({ voteAccount, voteAccountBump, network }) {
  const { enqueueSnackbar } = useSnackbar();
  const wallet = useWallet();

  const [votes, setVotes] = useState({
    candidateOneNumberOfVotes: null,
    candidateTwoNumberOfVotes: null,
  });
  const [electionTxHistory, setElectionTxHistory] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    console.log('VoteAccount', voteAccount);
    // Call Solana program for vote count
    async function getVotes() {
      const connection = new Connection(network, preflightCommitment);
      const provider = new Provider(connection, wallet, preflightCommitment);
      const program = new Program(idl, programID, provider);
      try {
        const account = await program.account.electionState.fetch(voteAccount);
        setVotes({
          candidateOneNumberOfVotes: account.candidateOneNumberOfVotes?.toNumber(),
          candidateTwoNumberOfVotes: account.candidateTwoNumberOfVotes?.toNumber(),
        });
        console.log('Validator hash: ');
        console.log(account.validator.toString());
      } catch (error) {
        console.log("could not getVotes: ", error);
      }
    }

    if (!!voteAccount) {
      getVotes();
    }
  }, [voteAccount, network, wallet]);

  async function getProvider() {
    const connection = new Connection(network, preflightCommitment);
    const provider = new Provider(connection, wallet, preflightCommitment);
    return provider;
  }

  // Initialize the program if this is the first time its launched
  async function initializeElection() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.initialize(new BN(voteAccountBump), {
        accounts: {
          user: provider.wallet.publicKey,
          voteAccount: voteAccount,
          systemProgram: web3.SystemProgram.programId,
        },
      });
      console.log('User!!!: ', provider.wallet.publicKey.toString());
      const account = await program.account.electionState.fetch(voteAccount);
      console.log('User2!!!: ', provider.wallet.publicKey.toString());
      setVotes({
        candidateOneNumberOfVotes: account.candidateOneNumberOfVotes?.toNumber(),
        candidateTwoNumberOfVotes: account.candidateTwoNumberOfVotes?.toNumber(),
      });
      enqueueSnackbar("Vote account initialized", { variant: "success" });
    } catch (error) {
      console.log("Transaction error: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  async function handleVote(side) {
    const provider = await getProvider();
    console.log('User3!!!!', provider.wallet.publicKey.toString());
    const program = new Program(idl, programID, provider);
    try {
      const tx =
        side === "CandidateOne"
          ? await program.rpc.voteForCandidateOne(provider.wallet.publicKey, {
            accounts: {
              voteAccount,
            },
          })
          : await program.rpc.voteForCandidateTwo(provider.wallet.publicKey, {
            accounts: {
              voteAccount,
            },
          });

      const account = await program.account.electionState.fetch(voteAccount);
      setVotes({
        candidateOneNumberOfVotes: account.candidateOneNumberOfVotes?.toNumber(),
        candidateTwoNumberOfVotes: account.candidateTwoNumberOfVotes?.toNumber(),
      });
      enqueueSnackbar(`Voted for ${capitalize(side)}!`, { variant: "success" });
      setElectionTxHistory((oldElectionTxHistory) => [...oldElectionTxHistory, tx]);
    } catch (error) {
      console.log("Transaction error: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  async function handleVerifyCitizen(citizenPublicKey) {
    setIsOpenModal(false);

    console.log("PubKey citizen");
    console.log(new PublicKey(citizenPublicKey));
    console.log(new PublicKey(citizenPublicKey).toString());

    const provider = await getProvider();
    console.log('User4!!!!', provider.wallet.publicKey.toString());
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.verifyCitizen(new PublicKey(citizenPublicKey), provider.wallet.publicKey, {
        accounts: {
          voteAccount,
        },
      });

      enqueueSnackbar(`Citizen was added`, { variant: "success" });
    } catch (error) {
      console.log("Adding error: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  return (
    <Box display="flex" flexDirection="column" height="100%" >
      <Box flex="1 0 auto">
        <ElectionNavbar voteAccount={voteAccount} />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ElectionIntro
                votes={votes}
                initializeElection={initializeElection}
                programID={programID}
                voteAccount={voteAccount}
              />
            </Grid>
            <Grid item xs={12}>
              <ElectionProgress votes={votes} />
            </Grid>
            <Grid item xs={6}>
              <VoteOption side="CandidateOne" isLeftSide={true} handleVote={handleVote} />
            </Grid>
            <Grid item xs={6}>
              <VoteOption side="CandidateTwo" isLeftSide={false} handleVote={handleVote} />
            </Grid>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <ElectionModalButton handleOpenModal={() => setIsOpenModal(true)} />
            </Grid>
            <Grid item xs={12}>
              <ElectionHistory electionTxHistory={electionTxHistory} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ElectionForm isOpen={isOpenModal} handleClose={() => setIsOpenModal(false)} handleSubmit={handleVerifyCitizen} />
    </Box>
  );
}

ElectionMain.propTypes = propTypes;
ElectionMain.defaultProps = defaultProps;
