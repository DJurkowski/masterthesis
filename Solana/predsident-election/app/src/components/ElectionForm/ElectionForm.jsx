import React, { useState } from "react";
import { Box, Modal, TextField, Button } from "@material-ui/core";
import { electionFormStyle } from './ElectionFormStyle';

const useStyles = electionFormStyle;

export default function ElectionForm({ isOpen, handleClose, handleSubmit }) {
	const classes = useStyles();
	const [textValue, setTextValue] = useState("");
	const [isError, setIsError] = useState(false);
	const onTextChange = (e) => setTextValue(e.target.value);
	const resetInput = () => setTextValue("");

	function handleSubmitForm() {
		if(textValue.trim() === "" || !textValue.trim() || textValue.trim().length < 32 || textValue.trim().length > 45) {
			setIsError(true);
		} else {
			setIsError(false);
			resetInput();
			handleSubmit(textValue);
		}
	}

	return (
		<Modal
			open={isOpen}
			onClose={handleClose}
		>
			<Box
				className={classes.modal}
			>
				<TextField
					required
					error = {isError}
					onChange={onTextChange}
					value={textValue}
					label={"Citizen Public Key"}
					variant="outlined"
					className={classes.input}
					helperText={isError && "Input is invalid"}
				/>
				<Button
					onClick={handleSubmitForm}
					size={"large"}
					color={"primary"}
					className={classes.button}
				>Submit</Button>
			</Box>
		</Modal>
	);
}