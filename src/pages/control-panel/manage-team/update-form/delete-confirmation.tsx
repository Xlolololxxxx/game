import { Button } from '@mui/material';
import { Dialog } from '@src/components/dialog';

type Props = {
	visible: boolean;
	onSubmit: () => void;
	onClose: () => void;
}

const DeleteConfirmation = (props: Props) => {

	return (
		<Dialog
			isOpen={props.visible}
			dividers={false}
			onClose={props.onClose}
			dialogTitle={"Delete Confirmation"}
			dialogContent={"Are you sure you want to remove the user?"}
			dialogActions={(
				<>
				<Button onClick={props.onSubmit}>Yes</Button>
				<Button autoFocus onClick={props.onClose}>No</Button>
				</>
			)}
		/>
	);
}

export default DeleteConfirmation;