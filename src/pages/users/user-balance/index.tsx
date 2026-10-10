import { LoadingButton } from '@mui/lab';
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Dialog } from "@src/components/dialog";
import { FormInput } from '@src/components/form-input';
import { Select } from "@src/components/select";
import { UserUpdateBalanceFormType } from "@src/lib/types/users";
import { useAuthService } from '@src/store/hooks';
import { useUsersService } from '../hooks';
import { useUsersContext } from "../provider";
import { getCurrencyTypes } from '@src/utils/mockdata/menu-options';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';

const UserBalance = () => {
    const { currentUser } = useAuthService();
    const { partner } = usePartnerDropdownContext();
    const { onUpdateUserBalance } = useUsersService();
    const { state, handleCloseUpdateBalance } = useUsersContext();
    const { editBalanceOpen, selectedUser } = state ?? {};

    const { control, getValues } = useForm<UserUpdateBalanceFormType>({
        defaultValues: {
            amount: 0,
            coinTypeID: 1,
        }
    });

    const onSubmit = () => {
        const values = getValues();
        const params = {
            ...values,
            userID: selectedUser?.id,
            authorizedByUserID: currentUser.id,
        }
        onUpdateUserBalance.mutate(params);
    }

    return (
        <Dialog
            isOpen={Boolean(editBalanceOpen)}
            onClose={handleCloseUpdateBalance}
            dialogTitle={"Update Balance"}
            dialogContent={
                <>
                    <Select
                        name="coinTypeID"
                        control={control}
                        options={getCurrencyTypes(partner)}
                        labelId="coinTypeID-select"
                        label="Coin Type"
                        size="small"
                    />
                    <FormInput
                        internalLabel
                        name="amount"
                        label="Amount"
                        control={control}
                    />
                </>
            }
            dialogActions={(
                <>
                    <LoadingButton onClick={onSubmit}>
                        Update
                    </LoadingButton>
                    <Button
                        autoFocus
                        onClick={handleCloseUpdateBalance}
                        sx={{ color: 'text.secondary' }}
                    >
                        Close
                    </Button>
                </>
            )}
        />
    )
}

export default UserBalance