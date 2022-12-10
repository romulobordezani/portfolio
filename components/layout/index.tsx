import * as React from 'react';
import Box from '@mui/material/Box';
import { cloudyBackGround } from './styles';

const LayoutComponent: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <Box sx={cloudyBackGround}>{children}</Box>
);

export default LayoutComponent;
