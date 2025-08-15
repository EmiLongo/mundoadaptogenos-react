// src/modules/admin/components/SwitchCustom.tsx
import { greenColor, greyColor } from "@/theme/theme";
import { styled, Switch, SwitchProps } from "@mui/material";

export const SwitchCustom = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translate(14px, -4px)',
      '& + .MuiSwitch-track': {
        backgroundColor: greenColor[900],
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: greyColor[50],
        boxSizing: 'border-box',
        width: 24,
        height: 24,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      backgroundColor: greyColor[800],
      border: `6px solid ${greyColor[800]}`,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      backgroundColor: greyColor[200],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: greyColor[800],
    boxSizing: 'border-box',
    width: 16,
    height: 16,
    transform: 'translate(7px, 6px)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 30,
    border: `2px solid ${greyColor[800]}`,
    backgroundColor: greyColor[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));