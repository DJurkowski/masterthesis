import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PredsidentElection } from "../target/types/predsident_election";
import assert from "assert";
const { SystemProgram } = anchor.web3;

describe("predsident-election", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.PredsidentElection as Program<PredsidentElection>;
  const voteAccount = anchor.web3.Keypair.generate();

  it("Initializes with 0 votes for crunchy and smooth", async () => {
    console.log("Testing Initialize...");
    /* The last element passed to RPC methods is always the transaction options. Because voteAccount is being created here, we are required to pass it as a signers array */
    await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });
    const account = await program.account.electionState.fetch(
      voteAccount.publicKey
    );
    console.log("CandidateOne: ", account.candidateOneNumberOfVotes.toString());
    console.log("CandidateTwo: ", account.candidateTwoNumberOfVotes.toString());
    assert.ok(
      account.candidateOneNumberOfVotes.toString() == '0' && account.candidateTwoNumberOfVotes.toString() == '0'
    );
  });
  it("Votes correctly for first candidate", async () => {
    console.log("Testing vote...");
    await program.rpc.voteForCandidateOne({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.electionState.fetch(
      voteAccount.publicKey
    );
    console.log("CandidateOne: ", account.candidateOneNumberOfVotes.toString());
    console.log("CandidateTwo: ", account.candidateTwoNumberOfVotes.toString());
    assert.ok(
      account.candidateOneNumberOfVotes.toString() == '1' && account.candidateTwoNumberOfVotes.toString() == '0'
    );
  });
  it("Votes correctly for second candidate", async () => {
    console.log("Testing vote...");
    await program.rpc.voteForCandidateTwo({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.electionState.fetch(
      voteAccount.publicKey
    );
    console.log("CandidateOne: ", account.candidateOneNumberOfVotes.toString());
    console.log("CandidateTwo: ", account.candidateTwoNumberOfVotes.toString());
    assert.ok(
      account.candidateOneNumberOfVotes.toString() == '1' && account.candidateTwoNumberOfVotes.toString() == '1'
    );
  });
});
