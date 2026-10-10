import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useForm } from 'react-hook-form';

import { GenerateProgramsAPIParams } from '@src/lib/types/programs';

import { useAccessControlContext } from '@src/context/AccessControl';
import { useAuthService } from '@src/store/hooks';
import { useProgramsContext } from '../provider';
import { useProgramsService } from './hooks';
import ProviderName from './provider-name';
import SelectDate from './select-date';

const FilterSection = () => {
  const { currentUser } = useAuthService();
  const { handleSubmit, control } = useForm<GenerateProgramsAPIParams>();
  const { onSetFormValues } = useProgramsContext();
  const { isLoading } = useProgramsService();
  const { state } = useAccessControlContext();
  const { access } = state || {};
  const isAllowedProvider = access?.revenueShare?.allowProviderSelection;

  const onSubmit = (data: GenerateProgramsAPIParams) => {
    onSetFormValues({
      gprProviderName: data.providerName || currentUser?.provider?.providerName || 'LION Games',
      gprDate: data?.gprDate?.label,
      gprMonth: data?.gprDate?.month,
      gprYear: data?.gprDate?.year,
    });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "100%",
            display: 'flex',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'row',
              sm: 'column',
              xs: 'column',
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
            height: "auto",
            pt: 3,
            pb: 5,
          }}>
          {isAllowedProvider ? <Controller
            name="providerName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <ProviderName
                value={value}
                onChange={onChange}
              />
            )}
          />: <Box flex={1} />}
          <Box
            sx={{
              flex: 0.8,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}>
            <Controller
              name="gprDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SelectDate
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <LoadingButton
              id="exclude-export"
              type='submit'
              loading={isLoading}
              size="large"
              variant={"contained"}
              sx={{
                height: {
                  xl: 52,
                  lg: 52,
                  md: 50,
                  sm: 50,
                  xs: 50,
                },
                fontSize: {
                  xl: "11px",
                  lg: "11px",
                  md: "9px",
                  sm: "9px",
                  xs: "9px",
                },
                bgcolor: "purple.dark",
                "&:hover": {
                  bgcolor: "purple.main"
                }
              }}
            >
              GENERATE
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </LocalizationProvider>
  );
}

export default FilterSection;
