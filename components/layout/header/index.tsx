import React, { FC } from 'react';
import Box from '@mui/material/Box';
import SocialBar from '../social-bar';
import { useTheme } from '@mui/system';

const Header: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
        alignContent: 'start',
        [theme.breakpoints.down('md')]: {
          margin: '5px',
        },
      }}
    >
      <Box sx={{ padding: '1rem' }}>
        <SocialBar />
      </Box>
    </Box>
  );
};

export default Header;
