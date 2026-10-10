import { ChangeEvent, useEffect, useRef } from 'react';

import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';

import { Dialog } from '@src/components/dialog';
import { FormInput } from '@src/components/form-input';
import Iconify from '@src/components/iconify';
import { Select } from '@src/components/select';
import { SelectOptionProps } from '@src/components/select/types';
import useGameCategories from '@src/hooks/useGameCategories';
import { useGamesService } from '../hooks';
import { useGamesContext } from '../provider';

import Config from '@src/utils/api/config';
import RadioField from './radio-group';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
};

export type GameDetailsFormState = {
  gameName: string;
  gameProvider: string;
  code: number;
  tierID: number;
  gameCategoryID: number;
  thumbnailPath: string;
  sequence: string;
  isNew: number;
  isFeatured: number;
  isTop: number;
  isActive: number;
  isGoldAllow: number;
};

function GameDetailsDialog() {
  const { control, reset, handleSubmit } = useForm<GameDetailsFormState>();

  const { gameCategories } = useGameCategories();

  const { onUploadGameThumbnail, onUpdateGameDetails, gameDetail } = useGamesService();
  const { state, accessControl, handleCloseEditDetails } = useGamesContext();
  const { editDetailsOpen } = state || {};

  const { allowUpdateGameThumbnail, allowUpdateGameInfo, allowUpdateTierLevel } = accessControl || {};

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (gameDetail) {
      reset({
        gameName: gameDetail.gameName,
        gameProvider: gameDetail.gameType?.provider?.name,
        code: gameDetail.code,
        tierID: gameDetail.tierID,
        gameCategoryID: gameDetail.gameCategory?.id,
        thumbnailPath: gameDetail?.thumbnailPath,
        sequence: gameDetail?.sequence?.toString(),
        isNew: gameDetail?.isNew || 0,
        isFeatured: gameDetail?.isFeatured || 0,
        isActive: gameDetail?.isActive || 0,
        isTop: gameDetail?.isTop || 0,
        isGoldAllow: gameDetail?.isGoldAllow || 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameDetail]);

  useEffect(() => {
    if (!editDetailsOpen) {
      reset({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editDetailsOpen]);

  const handleThumbnailFieldClicked = () => {
    // Trigger the click event of the hidden file input
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (gameDetail?.id && file) {
      onUploadGameThumbnail.mutate({
        gameId: gameDetail.id,
        file: file,
      }, {
        onSuccess: (result) => {
          reset({
            thumbnailPath: `${Config.APP_CDN_URL}/${result}`
          });
        }
      });
    }
  }

  const onSubmit = (formData: GameDetailsFormState) => {
    const newFormData = {
      ...formData,
      gameCategoryID: formData?.gameCategoryID,
      isNew: Number(formData?.isNew),
      isFeatured: Number(formData?.isFeatured),
      isActive: Number(formData?.isActive),
      isTop: Number(formData?.isTop),
      isGoldAllow: Number(formData?.isGoldAllow),
      code: gameDetail?.code,
      gameName: gameDetail?.gameName,
      gameTypeID: gameDetail?.gameType?.id,
      enrollmentDate: gameDetail?.enrollmentDate,
      lastModifiedDate: gameDetail?.lastModifiedDate,
      imagePath: formData.thumbnailPath,
      thumbnailPath: formData.thumbnailPath,
      isPremium: gameDetail?.isPremium,
      isVIP: gameDetail.isVIP,
      isPromotion: gameDetail.isPromotion,
      isBeta: gameDetail.isBeta,
      isMobile: gameDetail.isMobile,
      id: gameDetail?.id,
      packageFilePath: gameDetail.packageFilePath,
    };

    onUpdateGameDetails.mutate(newFormData);
  };

  return (
    <Dialog
      isOpen={editDetailsOpen}
      onClose={handleCloseEditDetails}
      dialogTitle="Game info"
      dialogContent={(
        <form id="game-details-form" onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Box display="flex" flexDirection="column" gap={2} width="100%">
            <Box display="flex" justifyContent="space-between" gap={2}>
              <FormInput
                name="gameName"
                label="Game Name"
                control={control}
                disabled
              />
              <FormInput
                name="gameProvider"
                label="Provider"
                control={control}
                disabled
              />
            </Box>

            <Box display="flex" justifyContent="space-between" gap={2}>
              <FormInput
                name="code"
                label="Code"
                control={control}
                disabled
              />
              <FormInput
                name="tierID"
                label="Tier Level"
                control={control}
                disabled={!allowUpdateTierLevel}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" gap={2}>
              <Select
                name="gameCategoryID"
                control={control}
                options={gameCategories as unknown as SelectOptionProps<string>[]}
                labelId="game-category-select"
                label="Game Category"
                size="small"
              />

              <FormInput
                name="thumbnailPath"
                label="Thumbnail URL"
                control={control}
                disabled={onUploadGameThumbnail.isPending || !allowUpdateGameThumbnail}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleThumbnailFieldClicked}
                        disabled={onUploadGameThumbnail.isPending || !allowUpdateGameThumbnail}
                        edge="end"
                      >
                        <Iconify icon="eva:upload-fill" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <VisuallyHiddenInput ref={inputRef} type="file" onChange={onUpload} />
            </Box>

            <Box display="flex" justifyContent="space-between" gap={2}>
              <FormInput
                name="sequence"
                label="Sequence"
                control={control}
                sx={{ width: '50%' }}
              />
            </Box>

            <Box>
              <Controller
                name="isNew"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioField
                    label="New Game?"
                    value={Number(value)}
                    onChange={(event: any) => onChange(event.target.value)}
                    data={[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 }
                    ]}
                  />
                )}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" gap={2}>
              <Controller
                name="isFeatured"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioField
                    label="For Features?"
                    value={Number(value)}
                    onChange={(event: any) => onChange(event.target.value)}
                    data={[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 }
                    ]}
                  />
                )}
              />
              <Controller
                name="isTop"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioField
                    label="Top Game?"
                    value={Number(value)}
                    onChange={(event: any) => onChange(event.target.value)}
                    data={[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 }
                    ]}
                  />
                )}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" gap={2}>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioField
                    label="Status"
                    value={Number(value)}
                    onChange={(event: any) => onChange(event.target.value)}
                    data={[
                      { label: "Active", value: 1 },
                      { label: "Inactive", value: 0 }
                    ]}
                  />
                )}
              />
              <Controller
                name="isGoldAllow"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioField
                    label="Gold Enable?"
                    value={Number(value)}
                    onChange={(event: any) => onChange(event.target.value)}
                    data={[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 }
                    ]}
                  />
                )}
              />
            </Box>
          </Box>
        </form>
      )}
      dialogActions={(
        <>
          <Button onClick={handleCloseEditDetails}>Cancel</Button>
          {allowUpdateGameInfo && <Button
            variant="contained"
            form="game-details-form"
            type="submit"
            disabled={onUpdateGameDetails.isPending}
          >
            Submit
          </Button>}
        </>
      )}
    />
  );
}

export default GameDetailsDialog;