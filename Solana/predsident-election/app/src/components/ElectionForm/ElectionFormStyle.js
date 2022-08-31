import { makeStyles } from "@material-ui/styles";

export const electionFormStyle = makeStyles((theme) => ({
	modal: {
		position: "absolute",
		top: "50%",
		left: "50%",
		display: "flex",
		flexDirection: "column",
		padding: "16px",
		transform: "translate(-50%, -50%)",
		width: 400,
		backgroundColor: "#595c76",
		border: "3px solid #000",
		borderRadius: "8px",
		boxShadow: 24,
		p: 4,
	},
	input: {
		"&::placeholder": {
      		color: "white",
    	},
		"& label": {
			color: "white",
		},
		"& fieldset": {
			borderColor: "white",
		},
		"& label.Mui-focused": {
			color: "white",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "blue",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "white",
			},
			"&:hover fieldset": {
				borderColor: "white",
			},
			"&.Mui-focused fieldset": {
				borderColor: "white",
			},
		},
		"& .MuiOutlinedInput-root": {
			color: "white",
		}
	},
	button: {
		marginTop: "1.5rem",
		paddingLeft: theme.spacing(1.5),
		paddingRight: theme.spacing(1.5),
		paddingTop: theme.spacing(1.5),
		paddingBottom: theme.spacing(1.5),
		fontSize: "1rem",
		textAlign: "center",
		justifyContent: "center",
		backgroundColor: theme.palette.primary.main,
		"&:hover": {
			backgroundColor: "rgb(70, 126, 172)",
		}
	}
}));