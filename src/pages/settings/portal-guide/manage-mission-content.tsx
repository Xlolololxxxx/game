import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';

const ManageMissionContent = () => {
	const { partner } = usePartnerDropdownContext();
	const img1 = partner === "palmsplay" ? "/assets/images/portal-guide/mission-1.png" : "/assets/images/portal-guide/mission-1.1.png";
	const img2 = partner === "palmsplay" ? "/assets/images/portal-guide/mission-2.png" : "/assets/images/portal-guide/mission-2.1.png";


	return (
    <AccordionDetails>
			<Typography fontWeight={"600"} fontSize={14}>
				1. Navigate to the Missions Page
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Click "Platform Tools" on the main menu.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Select "Missions" from the Platform Tools submenu.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					On the "Missions" page, locate the mission you want to update.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					You may use the search bar and pagination to find specific missions.
					</Typography>
				</li>
			</ul>
			<img 
				src={img1} 
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
			<Typography mt={3} fontWeight={"600"} fontSize={14}>
				2. Activate or Deactivate a Mission
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Click the toggle in the "Status" column. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					If the mission is active, clicking the toggle will deactivate it. 
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					If the mission is inactive, clicking the toggle will activate it.
					</Typography>
				</li>
			</ul>
			<img 
				src={img2}
				alt="Selected" 
				style={{ maxWidth: '90%', height: '90%' }} />
			<Typography mt={3} fontWeight={"600"} color="black" fontStyle={"italic"} fontSize={14}>
				<Typography 
					display="inline-block" 
					mr={1} fontStyle={"normal"}
					fontWeight={"600"}
					fontSize={14}
					whiteSpace={"pre-line"}
					color="red" >Note: </Typography>
					Activating or deactivating a mission may not reflect on the game platform until the next missions reset,{"\n"} as the system updates missions at the start of each week.
			</Typography>
			<Typography mt={3} fontWeight={"600"} fontSize={14}>
				3. Change the Game Associated with a Mission
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Locate the mission with an associated game.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Click the "Edit" button in the "Settings" column for that mission.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					On the "Edit Mission" form, click the dropdown where the current game name is displayed.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Select a new game from the dropdown list or type the game name.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Click "Save".
					</Typography>
				</li>
			</ul>
		
			<Typography mt={2} fontWeight={"600"} color="red" fontSize={14}>
				Note: 
				<Typography 
					display="inline-block" 
					ml={1} fontStyle={"italic"}
					fontWeight={"600"}
					fontSize={14}
					color="black" >Changing the game will take effect immediately and may impact players currently completing the mission.</Typography>
			</Typography>
		</AccordionDetails>
  );
}

export default ManageMissionContent;