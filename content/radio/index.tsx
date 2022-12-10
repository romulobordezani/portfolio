import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import ReactPlayer from 'react-player/soundcloud';

export const RadioContent: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="body1"
        component="div"
        sx={{
          [theme.breakpoints.up('xl')]: {
            fontSize: '1.6rem',
          },
          padding: '10px',
          color: 'white',
          mb: 3,
        }}
      >
        What about some of my blues to hear for a while?
      </Typography>
      <ReactPlayer
        width="100%"
        url="https://soundcloud.com/romulo-bordezani"
        controls={true}
      />
    </Box>
  );
};
