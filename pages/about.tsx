import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const About: NextPage = () => {
  return (
      <Container maxWidth="lg">
        <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >

          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
               About me  - Coming soon 🤓
            </Typography>
          </Box>
        </Box>
      </Container>
  );
};

export default About;
