import { LoadingButton } from '@mui/lab';
import { Box, Button } from "@mui/material";
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

import { Dialog } from "@src/components/dialog";
import { FormInput } from '@src/components/form-input';
import { Select } from "@src/components/select";

import { UserUpdateTierLevelFormType } from "@src/lib/types/users";

import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import { useAuthService } from '@src/store/hooks';
import { getTierLevels } from '@src/utils/mockdata/menu-options';
import { useUsersService } from '../hooks';
import { useUsersContext } from "../provider";

const UserTierLevel = () => {
    const { currentUser } = useAuthService();
    const { partner } = usePartnerDropdownContext();
    const TIER_LEVELS = getTierLevels(partner);
    const { onUpdateUserTierLevel } = useUsersService();
    const { state, handleCloseUpdateTierLevel } = useUsersContext();
    const { editTierLevelOpen, selectedUser } = state ?? {};

    const { control, getValues, reset } = useForm<UserUpdateTierLevelFormType>({
        defaultValues: {
            tierID: 1,
            currentTierID: TIER_LEVELS[0].label,
        }
    });

    const onSubmit = () => {
        const values = getValues();
        const params = {
            ...values,
            userID: selectedUser?.id,
            authorizedByUserID: currentUser.id,
        }
        onUpdateUserTierLevel.mutate(params);
    }

    useEffect(() => {
        if (selectedUser) {
            reset({
                currentTierID: selectedUser.tier?.name
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUser]);

    return (
        <Dialog
            isOpen={Boolean(editTierLevelOpen)}
            onClose={handleCloseUpdateTierLevel}
            dialogTitle={"Update Tier Level"}
            dialogContent={
                <Box display="flex" flex={1} gap={5}>
                    <FormInput
                        internalLabel
                        name="currentTierID"
                        label="Current Tier Level"
                        control={control}
                        disabled
                        sx={{ flex: 1 }}
                    />
                    <Select
                        name="tierID"
                        control={control}
                        options={TIER_LEVELS}
                        labelId="tierID-select"
                        label="Change To"
                        size="small"
                    />
                </Box>
            }
            dialogActions={(
                <>
                    <LoadingButton onClick={onSubmit} loading={onUpdateUserTierLevel.isPending}>
                        Update
                    </LoadingButton>
                    <Button
                        autoFocus
                        onClick={handleCloseUpdateTierLevel}
                        sx={{ color: 'text.secondary' }}
                    >
                        Close
                    </Button>
                </>
            )}
        />
    )
}

export default UserTierLevel;