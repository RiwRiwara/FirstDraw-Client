import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      maxHeight: '180px',
      overflow: 'auto',
      zIndex: 9999
    }),
    menuList: (provided, state) => ({
      ...provided,
      maxHeight: '180px',
      overflow: 'auto',
      zIndex: 9999
    }),
  };


