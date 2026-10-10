import { InputAdornment, Typography } from "@mui/material";

import Iconify from "@src/components/iconify";

import { StyledRoot, StyledSearch } from "@src/sections/@dashboard/styles.css";

interface ToolBarProps {
	search: string;
	onChange: (value: string) => void;
}

const Toolbar = (props: ToolBarProps) => {

	return (
		<StyledRoot
			sx={{
				width: "100%",
				my: {
					xl: 0,
					lg: 0,
					md: 0,
					sm: "22px",
					xs: "22px",
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
					sm: 'flex-start',
					xs: 'flex-start',
				}
			}}>
			<Typography variant="h5" >
				Table of Contents
			</Typography>
			<StyledSearch
				value={props.search}
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
				onChange={(event) => props.onChange(event.target.value)}
				placeholder="Search Keywords..."
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
		</StyledRoot>
	)
}

export default Toolbar