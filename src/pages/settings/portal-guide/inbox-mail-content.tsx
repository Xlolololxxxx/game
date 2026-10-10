import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const InboxMailContent = () => {
	return (
    <AccordionDetails>
			<Typography fontWeight={"600"} fontSize={14}>
				1. Navigate to the In Mail Portal
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
						Click "Platform Tools" on the main menu. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
						Select "In Mail Portal" from the Platform Tools submenu.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
						On the "In Mail Portal" page, click "Create New Mail".
					</Typography>
				</li>
			</ul>
			<img 
				src={"/assets/images/portal-guide/inbox-1.png"} 
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
			<Typography mt={3} fontWeight={"600"} fontSize={14}>
				2. Fill Out the New Mail Form
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Mail Name: Enter the name that will be visible to players in their inbox, just below the thumbnails.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Popup Description: Provide a description for admin reference (not visible to players).
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Upload Message Preview: This is the main content of the inbox mail in image form.
					</Typography>
					<div style={{paddingLeft: "20px"}}>
						<li>
							<Typography fontSize={14}>
							Recommended size: 1000x560 pixels (landscape) to ensure it fits correctly in the game platform's inbox.
							</Typography>
						</li>
						<li>
							<Typography fontSize={14}>
							Maximum file size: 3MB.
							</Typography>
						</li>
					</div>
				</li>
				<li>
					<Typography fontSize={14}>
					Upload Thumbnail Preview: A small preview when players open their inbox.
					</Typography>
					<div style={{paddingLeft: "20px"}}>
						<li>
							<Typography fontSize={14}>
							Recommended size: 500x500 pixels (square) to ensure it fits correctly in the game platform's inbox thumbnail. 							</Typography>
						</li>
						<li>
							<Typography fontSize={14}>
							Maximum file size: 3MB.
							</Typography>
						</li>
					</div>
				</li>
			</ul>
			<img 
				src={"/assets/images/portal-guide/inbox-2.png"} 
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
			<Typography mt={3} fontWeight={"600"} fontSize={14}>
				3. Configure Mail Settings
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Visibility: Choose who can see the mail ("Everyone", "Copper", "Bronze", "Silver", or "Gold" tiers).
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Schedule: Select the start and end dates for when the mail should be displayed. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Select the day your mail will appear: Tick the checkboxes for the specific days the mail should appear (Monday to Sunday).
					</Typography>
				</li>
			</ul>
			<img 
				src={"/assets/images/portal-guide/inbox-3.png"} 
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
			<Typography mt={3} fontWeight={"600"} fontSize={14}>
				4. Advanced Settings (Optional)
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Scroll down and click the arrow-down button to expand the "Advanced Settings" section.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					This section allows you to add a Bonus Coin reward or a Call-to-Action (CTA).
					</Typography>
				</li>
				<div style={{paddingLeft: "20px", marginTop: "10px"}}>
					<li>
						<Typography fontWeight={"600"} fontSize={14}>
						Option 1: Add Bonus Coin
						</Typography>
					</li>
					<div style={{paddingLeft: "20px"}}>
						<li>
							<Typography fontSize={14}>
							When enabled, the entire in-mail message becomes clickable, and clicking it will credit bonus coins to the player. 
							</Typography>
						</li>
						<li>
							<Typography fontSize={14}>
							Tick the "Add Coin Bonus" checkbox.  
							</Typography>
						</li>
						<li>
							<Typography fontSize={14}>
							Enter values for "Silver Coins" and/or "Bonus Gold Coins" (numbers only).
							</Typography>
						</li>
					</div>
					<li>
						<Typography fontWeight={"600"} fontSize={14}>
						Option 2: Add CTA
						</Typography>
					</li>
					<div style={{paddingLeft: "20px"}}>
						<li>
							<Typography fontSize={14}>
							When enabled, clicking the in-mail message will direct players to a specific game, store package, or URL.
							</Typography>
						</li>
						<li>
							<Typography fontSize={14}>
							Tick the "Add CTA" checkbox 
							</Typography>
						</li>
						<li>
							<Typography fontSize={14}>
							Choose one of the following actions:
							</Typography>
						</li>
						<div style={{paddingLeft: "20px"}}>
							<li>
								<Typography fontSize={14}>
								Connect to Game: Tick the checkbox and select a game from the dropdown list or type the game name. 
								</Typography>
							</li>
							<li>
								<Typography fontSize={14}>
								Connect to Store Package: Tick the checkbox and select a package from the dropdown list. 
								</Typography>
							</li>
							<li>
								<Typography fontSize={14}>
								Connect to URL: Tick the checkbox and enter the destination URL.
								</Typography>
							</li>
						</div>
					</div>
				</div>
			</ul>
			<img 
				src={"/assets/images/portal-guide/inbox-4.png"} 
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
		</AccordionDetails>
  );
}

export default InboxMailContent;