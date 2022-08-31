import React from "react";
import { Button, Box } from "@material-ui/core";
import { electionModalButtonStyle } from './ElectionModalButtonStyle';

const useStyles = electionModalButtonStyle;

export default function ElectionModalButton({ handleOpenModal }) {
	const classes = useStyles();
	return (
		<Box textAlign="center">
			<Button
				variant="contained"
				onClick={handleOpenModal}
				size="large"
				color={"primary"}
				className={classes.button}
			>
				{`Verify Citizen`}
			</Button>
		</Box>
	);
}