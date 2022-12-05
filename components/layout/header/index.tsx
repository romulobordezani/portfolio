import React, { FC } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container } from '@mui/material';

import SocialBar from '../social-bar';
import Link from '../../../src/Link';
import Logo from  '../../../public/logo-romulo-bordezani.svg';
import { useTheme } from '@mui/system';

const Header: FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'end',
            alignContent: 'start',
            [theme.breakpoints.down('md')]: {
                margin: '5px',
            },
        }}>
            <Box sx={{ padding: '1rem', }}>
                <SocialBar />
            </Box>
        </Box>
    );
};

export default Header;
