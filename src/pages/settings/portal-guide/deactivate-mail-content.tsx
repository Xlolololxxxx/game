import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const DeactivateMailContent = () => {
	return (
    <AccordionDetails>
			<Typography fontWeight={"600"} fontSize={14}>
				1. Navigate to the In Mail Portal
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Locate the mail you want to update from the mail list. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Click the "Open" button on the mail you wish to update. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Click the "Edit Mail" button.
					</Typography>
				</li>
			</ul>
			<img 
				src={"/assets/images/portal-guide/deactivate-1.png"} 
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
			<Typography mt={3} fontWeight={"600"} fontSize={14}>
				2. Update Mail Details
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Modify the in-mail details as needed. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					You may also upload a new "Message Preview" or "Thumbnail Preview" and update the in-mail settings.
					</Typography>
				</li>
			</ul>
			<img 
				src={"/assets/images/portal-guide/inbox-2.png"} 
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
			<Typography mt={3} fontWeight={"600"} fontSize={14}>
				3. Activate or Deactivate a Mail
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					In the edit form, locate the "Status" section. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					If the mail is active, click the "DEACTIVATE" button to disable it. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					If the mail is inactive, click the "ACTIVATE" button to enable it.
					</Typography>
				</li>
			</ul>
			<img 
				src={"/assets/images/portal-guide/deactivate-2.png"} 
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
			<Typography mt={3} fontWeight={"600"} fontSize={14}>
				4. Save Changes
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Review all updates. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Click the "Save" button to apply the changes.
					</Typography>
				</li>
			</ul>
		</AccordionDetails>
  );
}

export default DeactivateMailContent;