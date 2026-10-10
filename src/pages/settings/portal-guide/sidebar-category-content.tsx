import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const SideBarCategoryContent = () => {
	return (
    <AccordionDetails>
			<ol style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					Click "Games" on the main menu to navigate to the Games page.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Locate the game you wish to update in the Games table by using the search bar or scrolling through the list.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Click the kebab menu (three vertical dots) next to the game you want to edit.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Click the "Edit" option.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					Locate the "Game Category" drop-down.
					</Typography>
					<ul style={{paddingLeft: "18px", paddingTop: "7px" }}>
						<li>
							<Typography fontSize={14}>
							Select the appropriate category: Slot, Arcade, or Instant Game.
							</Typography>
						</li>
					</ul>
				</li>
				<li>
					<Typography fontSize={14}>
					Set the Game Properties using the radio buttons:
					</Typography>
					<ul style={{paddingLeft: "18px", paddingTop: "7px" }}>
						<li>
							<Typography fontSize={14}>
							New Game: Select "Yes" to tag the game as a new game and display it under "New Games" on the platform's sidebar. Select "No" to remove it from this section.
							</Typography>
						</li>
						<li>
							<Typography fontSize={14}>
							Top Game: Select "Yes" to highlight the game as a top game and display it under "Top Games" on the sidebar. Select "No" to remove it from this section.
							</Typography>
						</li>
						<li>
							<Typography fontSize={14}>
							Featured Game: Select "Yes" to feature the game under "Featured Games" on the sidebar. Select "No" to remove it from this section.
							</Typography>
						</li>
					</ul>
				</li>
				<li>
					<Typography fontSize={14}>
					Click the "Save" button to apply the changes.
					</Typography>
				</li>
			</ol>
			<Typography mt={1} fontWeight={"600"} fontSize={14}>
			Additional Information:
			</Typography>
			<ul style={{paddingLeft: "18px", paddingTop: "7px", paddingBottom: "15px" }}>
				<li>
					<Typography fontSize={14}>
					The game platform's sidebar now organizes games based on Game Category (Slot, Arcade, Instant Game) and Game Properties (New, Top, Featured). A game can belong to a category while also being tagged as New, Top, or Featured, allowing for better visibility and organization.
					</Typography>
				</li>
				<li>
					<Typography fontSize={14}>
					"My Favourites" is a user-driven category and is not managed through the admin portal. Players can manually add games to their favorites list within the platform by clicking the heart icon on the game thumbnails.
					</Typography>
				</li>
			</ul>
		</AccordionDetails>
  );
}

export default SideBarCategoryContent;