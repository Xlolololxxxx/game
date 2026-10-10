import { Button, IconButton, InputAdornment } from "@mui/material";
import { UsersToolbarProps } from "@src/lib/types/users";
import ButtonExport from "@src/components/buttons/button-export";
import Iconify from "@src/components/iconify";
import { StyledRoot, StyledSearch, StyledWrap } from "@src/sections/@dashboard/styles.css";
import { useRedeemTransactionsService } from "../hooks";
import { useRedeemTransactionsContext } from "../provider";

const Toolbar = ({ isLoading }: UsersToolbarProps) => {
	const { state, handleSearch, handleToggleFilterSidebar } = useRedeemTransactionsContext();
	const { onRefreshRedeemTransactionsList, onExportRedeemTransactionsList } = useRedeemTransactionsService();

	const { search } = state ?? {}

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
				height: {
					xl: 96,
					lg: 96,
					md: 96,
					sm: 122,
					xs: 122,
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
				type="number"
				onChange={(event) => handleSearch(event.target.value)}
				placeholder="Search by user id..."
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

			<StyledWrap sx={{gap: 2}} >
				<Button
					disableRipple
					color="inherit"
					endIcon={<Iconify icon="ic:round-filter-list" />}
					onClick={() => handleToggleFilterSidebar(true)}
				>
					Filters&nbsp;
				</Button>
				<IconButton aria-label="delete" color="primary" onClick={onRefreshRedeemTransactionsList}>
					<Iconify icon={'mdi:refresh'} width={30} />
				</IconButton>
				<ButtonExport
					onClick={() => onExportRedeemTransactionsList.mutate()}
					loading={onExportRedeemTransactionsList.isPending}
				/>
			</StyledWrap>
		</StyledRoot>
	)
}

export default Toolbar