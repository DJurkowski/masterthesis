use anchor_lang::prelude::*;

declare_id!("DjhBSyYGCxtXNPJaLov2iWAuQkLLvhQTajCEWZnJSCCP");

#[program]
pub mod predsident_election {

    use super::*;
    use anchor_lang::solana_program::entrypoint::ProgramResult;
    use core::option::Iter;

    pub fn initialize(ctx: Context<Initialize>, vote_account_bump: u8) -> ProgramResult {
        ctx.accounts.vote_account.bump = vote_account_bump;
        ctx.accounts.vote_account.validator = ctx.accounts.user.key();
        ctx.accounts.vote_account.verify_citizens.push(ctx.accounts.user.key());
        Ok(())
    }

    pub fn vote_for_candidate_one(ctx: Context<Vote>, citizen_key: Pubkey) -> Result<()> {
        let election_vote: &mut Account<ElectionState> = &mut ctx.accounts.vote_account;
        let mut is_citizen_verified: bool = false;

        let mut iter_ver = election_vote.verify_citizens.iter();
        if iter_ver.any(|&v: &anchor_lang::prelude::Pubkey| v == citizen_key) {
            is_citizen_verified = true;
        }

        if !is_citizen_verified {
            return err!(CustomError::CitizenIsNotVerify);
        }

        let mut iter = election_vote.citizens.iter();
        if iter.any(|&v: &anchor_lang::prelude::Pubkey| v == citizen_key) {
            return err!(CustomError::CitizenAlreadyVote);
        }

        election_vote.candidate_one_number_of_votes += 1;
        election_vote.citizens.push(citizen_key);
        
        Ok(())
    }

    pub fn vote_for_candidate_two(ctx: Context<Vote>, citizen_key: Pubkey) -> Result<()> {
        let election_vote: &mut Account<ElectionState> = &mut ctx.accounts.vote_account;
        let mut is_citizen_verified: bool = false;

        let mut iter_ver = election_vote.verify_citizens.iter();
        if iter_ver.any(|&v: &anchor_lang::prelude::Pubkey| v == citizen_key) {
            is_citizen_verified = true;
        }

        if !is_citizen_verified {
            return err!(CustomError::CitizenIsNotVerify);
        }

        let mut iter = election_vote.citizens.iter();
        if iter.any(|&v: &anchor_lang::prelude::Pubkey| v == citizen_key) {
            return err!(CustomError::CitizenAlreadyVote);
        }

        election_vote.candidate_two_number_of_votes += 1;
        election_vote.citizens.push(citizen_key);

        Ok(())
    }

    pub fn verify_citizen(ctx: Context<Vote>, citizen_key: Pubkey, validator_key: Pubkey) -> Result<()> {
        let election_vote: &mut Account<ElectionState> = &mut ctx.accounts.vote_account;

        if validator_key != election_vote.validator {
            return err!(CustomError::VerifyValidator);
        }

        let mut iter = election_vote.verify_citizens.iter();
        if iter.any(|&v: &anchor_lang::prelude::Pubkey| v == citizen_key) {
            return err!(CustomError::CitizenAlreadyVerify);
        }

        election_vote.verify_citizens.push(citizen_key);

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(vote_account_bump: u8)]
pub struct Initialize<'info> {
    #[account(init, seeds = [b"vote_account".as_ref()], bump, payer = user, space=10240)]
    vote_account: Account<'info, ElectionState>,
    #[account(mut)]
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut, seeds = [b"vote_account".as_ref()], bump = vote_account.bump)]
    vote_account: Account<'info, ElectionState>,
}

#[account]
#[derive(Default)]
pub struct ElectionState {
    candidate_one_number_of_votes: u64,
    candidate_two_number_of_votes: u64,
    bump: u8,
    validator: Pubkey,
    citizens: Vec<Pubkey>,
    verify_citizens: Vec<Pubkey>,
}

#[error_code]
pub enum CustomError {
    #[msg("Citizen already voted.")]
    CitizenAlreadyVote,

    #[msg("Citizen is not verified. Please verify citizen.")]
    CitizenIsNotVerify,

    #[msg("Citizen already verified.")]
    CitizenAlreadyVerify,

    #[msg("Only validator/contract owner can initilialize citizens.")]
    VerifyValidator,
}