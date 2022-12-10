import React, { FC } from 'react';
import { cloudStyle } from './styles.module';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';

export interface CloudProps {
  index: number;
}

export const Cloud: FC<CloudProps> = ({ index }) => {
  const theme = useTheme();
  return index === 1 ? <Box sx={{ ...cloudStyle(index, theme) }} /> : null;
};
