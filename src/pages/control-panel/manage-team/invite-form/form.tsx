/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { InviteUserFormValues } from '@src/lib/types/control-panel';

// components
import { FormInput } from '@src/components/form-input';

import { Select } from '@src/components/select';
import { useManageTeamService } from '../hooks';
import useGameProviders from '@src/hooks/useGameProviders';

export default function InviteUserForm() {
	const { gameProviders } = useGameProviders();
  const { onInviteUser } = useManageTeamService();

  const { control, handleSubmit, watch } = useForm<InviteUserFormValues>({
    defaultValues: {
      name: '',
      userTypeId: '',
      email: '',
    }
  });

  const onSubmit = (formData: InviteUserFormValues) => {
    onInviteUser.mutate(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack
          spacing={3}
          sx={{
            width: '50%',
            margin: '0 auto',
            pb: "20px"
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
            <Typography variant="h5" sx={{ color: '#111111' }}>
              INVITE TEAM MEMBER
            </Typography>
          </Stack>

          <Box>
            <FormInput
              name="name"
              label="Name"
              placeholder="Team Member's Name"
              control={control}
              rules={{ required: "Name is required" }}
            />
          </Box>

          <Box>
            <Select
              name="userTypeId"
              control={control}
              options={[
                { value: 4, label: "ADMIN" },
                { value: 5, label: "GENERAL" },
              ]}
              labelId="acctType-select"
              label="Account Type"
              size="small"
            />
          </Box>

          {watch("userTypeId") === 6 && <Select
							name="providerId"
							control={control}
							options={gameProviders}
							labelKey='name'
							valueKey="id"
							labelId="providerId-select"
							label="Provider Name"
							size="small"
              rules={{ required: "Provider Name is required" }}
						/>}

          <Box>
            <FormInput
              name="email"
              label="Email"
              placeholder="me@email.com"
              control={control}
              rules={{ required: "Email is required" }}
            />
          </Box>

          <LoadingButton
            loading={onInviteUser.isPending}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ backgroundColor: '#BA0BC9' }}
          >
            Send Invite
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
