import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

const UnderlineButton = styled(Button)({
  textTransform: 'none',
  color: "#718EBF",
  backgroundColor: 'transparent',
  borderRadius: 0,
  width: 112,
  '&:hover': {
    border: 'none',
  },
});

export default function ButtonGroups(props: any) {
  return (
    <ButtonGroup 
      aria-label="underline button group"
      disableElevation
      sx={{
        '& .MuiButtonGroup-grouped': {
          borderRight: 'none',
          border: "none"
        },
      }}>
      <UnderlineButton 
        sx={[props.activeTab === 1 && {
          "&.MuiButton-root": {
            color: "#1814F3",
            borderBottom: `3px solid #1814F3`
          },
        }]}
        onClick={() => props.onPress(1)} >
        Gender
      </UnderlineButton>
      <UnderlineButton
        sx={[props.activeTab === 2 && {
          "&.MuiButton-root": {
            color: "#1814F3",
            borderBottom: `3px solid #1814F3`
          },
        }]}
        onClick={() => props.onPress(2)} >
        Age
      </UnderlineButton>
      <UnderlineButton
        sx={[props.activeTab === 3 && {
          "&.MuiButton-root": {
            border: "none",
            color: "#1814F3",
            borderBottom: `3px solid #1814F3`
          },
        }]}
        onClick={() => props.onPress(3)} >
        State
      </UnderlineButton>
    </ButtonGroup>
  );
}
