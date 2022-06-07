import React, { FC } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container } from '@mui/material';

import SocialBar from '../../social-bar';
import Link from '../../../src/Link';
import Logo from  '../../../public/logo-romulo-bordezani.svg';
import { useTheme } from '@mui/system';

const Header: FC = () => {
    const theme = useTheme();

    return (
        <MuiAppBar position="fixed" elevation={0} sx={{ backgroundColor: 'transparent' }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: '30px'
                    }}>
                        <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '60px',
                                [theme.breakpoints.up('xl')]: {
                                    width: '200px'
                                },
                            }}
                        >
                            <img src={Logo} alt="Romulo Bordezani Logo" height="100%" width="100%" />
                        </Box>
                        <Box>
                            <SocialBar />
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};

export default Header;
