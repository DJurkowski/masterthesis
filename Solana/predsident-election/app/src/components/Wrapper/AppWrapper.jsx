
import React, { useCallback, useEffect, useState } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { useSnackbar } from "notistack";
import { programID, network, wallets } from "../../utils/config";
import { web3 } from "@project-serum/anchor";
import ElectionMain from "../ElectionMain/ElectionMain";

function AppWrappedWithProviders() {

    const { enqueueSnackbar } = useSnackbar();

    const [voteAccount, setVoteAccount] = useState({
        account: null,
        accountBump: null,
    });

    useEffect(() => {
        const getVoteAccount = async () => {
        let account,
            accountBump = null;
        [account, accountBump] = await web3.PublicKey.findProgramAddress(
            [Buffer.from("vote_account")],
            programID
        );
        setVoteAccount({ account, accountBump });
        };
        getVoteAccount();
    }, []);

    const onWalletError = useCallback(
        (error) => {
        enqueueSnackbar(
            error.message ? `${error.name}: ${error.message}` : error.name,
            { variant: "error" }
        );
        console.error(error);
        },
        [enqueueSnackbar]
    );

    return (
        <WalletProvider wallets={wallets} onError={onWalletError} autoConnect>
        <WalletDialogProvider>
            <ElectionMain
                network={network}
                voteAccount={voteAccount.account}
                voteAccountBump={voteAccount.accountBump}
            />
        </WalletDialogProvider>
        </WalletProvider>
    );
};

export default AppWrappedWithProviders;