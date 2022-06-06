import * as React from 'react';
import { cloud, sun,  } from './styles';
import { Box } from '@mui/material';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const CloudyBackGround: React.FC = () => {
    return(
        <Box  >
            {/*
            <Box sx={{ ...sun() }} />
            <Box sx={{ ...cloud(1) }} />
            <Box sx={{ ...cloud(3) }} />
            <Box sx={{ ...cloud(4) }} />*/}
        </Box>
    )
};

export default CloudyBackGround;
