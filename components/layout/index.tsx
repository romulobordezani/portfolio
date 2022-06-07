import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { cloudyBackGround, mainWrapperStyle } from './styles';

const LayoutComponent: React.FC<{ children: JSX.Element }> = ({children}) => {
    return (
        <Box maxWidth="100%" sx={cloudyBackGround}>
            <Box component="main" sx={mainWrapperStyle}>
                <Toolbar/>
                {children}
            </Box>
        </Box>
    );
}

export default LayoutComponent;
