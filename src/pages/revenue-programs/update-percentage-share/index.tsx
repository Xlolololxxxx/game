import { Card, Container, IconButton, Stack, Table, TableContainer, Typography } from '@mui/material';
import DataTableRow from '@src/components/data-table/data-row';
import TableHeader from '@src/components/data-table/header';
import Iconify from '@src/components/iconify/Iconify';
import Scrollbar from '@src/components/scrollbar';
import { useToasterContext } from '@src/context/Toaster';
import { UpdateGameProviderAPIRequestType } from '@src/lib/types/game-providers';
import { AlertType } from '@src/lib/types/toaster';
import { TABLE_HEAD_REVENUE_PROGRAM } from '@src/utils/mockdata/table-headers';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgramsContext } from '../provider';
import UpdateConfirmationDialog from './confirm-update';
import { useProgramsService } from './hooks';
import TableRowItem from './table-row';

const UpdatePercentageShare = () => {
	const navigate = useNavigate();
	const { triggerOpen } = useToasterContext();
	const { onDispatch } = useProgramsContext();
	const { onUpdatePercentageShare, providersWithShareData, providersWithShareDataIsLoading } = useProgramsService();
	const [confirmationOpen, setConfirmationOpen] = useState(false);
	const [itemData, setItemData] = useState<UpdateGameProviderAPIRequestType>();

	const handleUpdatePercentageShare = async (data: UpdateGameProviderAPIRequestType) => {
			setConfirmationOpen(true);
			setItemData(data);
	}

	const handleClose = () => setConfirmationOpen(false);

	const handleConfirm = () => {
		onUpdatePercentageShare.mutate(itemData, {
			onSuccess: () => {
				triggerOpen({
					type: AlertType.success,
					title: 'Update Share Percentage',
					message: 'Successfully updated share percentage'
				});
				onDispatch('autogenerate')(+moment());
				handleClose();
			}
		});
	}

	return (
		<Container>
			<Stack direction="row" alignItems="center" ml={0} pl={0}>
				<IconButton size="large" sx={{pl: 0}} color="default" onClick={() => navigate(-1)}>
					<Iconify icon={'mdi:arrow-left'} width={{
						xl: 30,
						lg: 30,
						md: 30,
						sm: 20,
						xs: 20,
					}} />
				</IconButton>
				<Typography variant="h6" color="#747994">
					Go Back
				</Typography>
			</Stack>

			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
				<Typography variant="h6" color={"#343C6A"}>
					Update Percentage Share Calculator
				</Typography>
			</Stack>

			<Card sx={{ borderRadius: {
				xl: "25px",
				lg: "25px",
				md: "25px",
				sm: "10px",
				xs: "10px",
			}, px: "23px", py: "10px" }}>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 800 }}>
						<Table>
							<TableHeader
								headLabel={TABLE_HEAD_REVENUE_PROGRAM}
								sx={{
									flex: 1,
									textAlign: 'center',
									fontWeight: "600",
								}}
							/>
							<DataTableRow
								isLoading={providersWithShareDataIsLoading}
								headers={TABLE_HEAD_REVENUE_PROGRAM}
								data={providersWithShareData as any}
								renderItem={({ item, index }: any) => {
									return (
										<TableRowItem
											key={`${index}`}
											item={item}
											handleUpdatePercentageShare={handleUpdatePercentageShare}
										/>
									)
								}}
							/>
						</Table>
					</TableContainer>
				</Scrollbar>
			</Card>
			<UpdateConfirmationDialog
				handleClose={handleClose}
				handleConfirm={handleConfirm}
				oldValue={itemData?.oldValue || 0}
				newValue={itemData?.newValue || 0}
				open={confirmationOpen}
			/>
		</Container >
	)
}

export default UpdatePercentageShare