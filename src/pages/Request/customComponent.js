import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: '10px', 
}));
