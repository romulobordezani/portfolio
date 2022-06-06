import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from './header';
import { cloudyBackGround, mainWrapperStyle } from './styles';

const LayoutComponent: React.FC<{ children: JSX.Element }> = ({children}) => {
    const [ open, setOpen ] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box maxWidth="100%" sx={cloudyBackGround}>
            <Header open={open} toggleDrawer={toggleDrawer} />
            <Box component="main" sx={mainWrapperStyle}>
                <Toolbar/>
                {children}
            </Box>
        </Box>
    );
}

export default LayoutComponent;
