import { FC } from 'react';
import LogoSvg from '../../../public/images/mulo_logo_vertical-sun.svg';
import { Box } from '@mui/material';
import { floatingLogo } from './styles.module';
import { bem } from '../../../src/utils/bem';

export const FloatingLogo: FC = () => {
  return (
    <Box className={floatingLogo}>
      <picture>
        <img src={LogoSvg} alt="Mulo" className={bem(floatingLogo, 'image')} />
      </picture>
    </Box>
  );
};
