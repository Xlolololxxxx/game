import { IconButton, InputAdornment } from "@mui/material";
import ButtonExport from "@src/components/buttons/button-export";
import Iconify from "@src/components/iconify";
import { UsersToolbarProps } from "@src/lib/types/users";
import { StyledRoot, StyledSearch, StyledWrap } from "@src/sections/@dashboard/styles.css";
import DateSelected from "../date-selected";
import { useUsersService } from "../hooks";
import { useUsersContext } from "../provider";

const Toolbar = ({
	isLoading,
	handleRefresh
}: UsersToolbarProps) => {
	const {
		state,
		accessControl,
		handleSearch,
	} = useUsersContext();
	const { search } = state ?? {}
	const { onExportUsersSessionList } = useUsersService();

	return (
		<StyledRoot 
			sx={{
				gap: 1,
				width: "100%",
				my: {
					xl: 0,
					lg: 0,
					md: 0,
					sm: "22px",
					xs: "22px",
				},
				height: {
					xl: 96,
					lg: 96,
					md: 96,
					sm: "auto",
					xs: "auto",
				},
				flexDirection: {
					xl: "row",
					lg: "row",
					md: "row",
					sm: "column",
					xs: "column",
				},
				alignItems: {
					xl: 'center',
					lg: 'center',
					md: 'center',
					sm: 'flex-end',
					xs: 'flex-end',
				}
			}}>
			<StyledSearch
				disabled={isLoading}
				value={search}
				sx={{
					width: {
						xl: 320,
						lg: 320,
						md: 320,
						sm: "100%",
						xs: "100%",
					},
					'&.Mui-focused': {
						width: {
							xl: 320,
							lg: 320,
							md: 320,
							sm: "100%",
							xs: "100%",
						}
					},
				}}
				onChange={(event) => handleSearch(event.target.value)}
				placeholder="Search.."
				startAdornment={
					<InputAdornment position="start">
						<Iconify
							icon="eva:search-fill"
							sx={{
								color: 'text.disabled',
								width: 20,
								height: 20
							}}
						/>
					</InputAdornment>
				}
			/>

			<StyledWrap 
				sx={{
					gap: 2,
					px: 0,
					alignItems: {
						xl: "center",
						lg: "center",
						md: "center",
						sm: "flex-end",
						xs: "flex-end",
					},
					flexDirection: {
						xl: "row",
						lg: "row",
						md: "row",
						sm: "column",
						xs: "column",
					},
					width: {
						xl: "auto",
						lg: "auto",
						md: "auto",
						sm: "100%",
						xs: "100%",
					},
					height: {
						xl: 96,
						lg: 96,
						md: 96,
						sm: "auto",
						xs: "auto",
					}
				}}>
				<DateSelected />
				<IconButton aria-label="delete" color="primary" onClick={handleRefresh}>
					<Iconify icon={'mdi:refresh'} width={30} />
				</IconButton>
				{accessControl?.allowExportUserData && <ButtonExport
					variant="text"
					disableRipple
					disableElevation
					sx={{
						color: "white",
						width: {
							xl: "auto",
							lg: "auto",
							md: "auto",
							sm: "100%",
							xs: "100%",
						},
						marginLeft: 1, px: 6, height: 54, 
						bgcolor: "purple.dark",
						"&:hover": {
							bgcolor: "purple.main"
						}
					}}
					onClick={() => onExportUsersSessionList.mutate({})}
					loading={onExportUsersSessionList.isPending}
				/>}
			</StyledWrap>
		</StyledRoot>
	)
}

export default Toolbar