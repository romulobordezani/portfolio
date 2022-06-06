import React, { FC } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Typography, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import SocialBar from '../../social-bar';
import Link from '../../../src/Link';
import { useTheme } from '@mui/system';

interface HeaderProps {
    open?: boolean;
    toggleDrawer: () => void;
}

const Header: FC<HeaderProps> = ({ open, toggleDrawer}) => {
    const theme = useTheme();

    return (
        <MuiAppBar position="fixed" elevation={0} sx={{ backgroundColor: 'transparent' }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center'}} >
                            <Link href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <img src="/logo-romulo-bordezani.svg" alt="Romulo Bordezani Logo" height={40} />
                                <Typography
                                    component="h1"
                                    variant="h1"
                                    color="#FFF"
                                    sx={{ ml: '7px' }}
                                >
                                    <Typography sx={{ [theme.breakpoints.down('sm')]: { display: 'none'} }} >
                                        Rômulo Bordezani
                                    </Typography>
                                    <Typography sx={{ [theme.breakpoints.up('sm')]: { display: 'none'} }} >
                                        R&B
                                    </Typography>
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{ [theme.breakpoints.down('sm')]: { display: 'none'} }}>
                            <SocialBar />
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};

export default Header;
