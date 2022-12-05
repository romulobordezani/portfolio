import { FC } from 'react'
import Logo from '../../../public/images/mulo _logo_vertical-sun.svg'
import Image from 'next/image'
import { Box } from '@mui/material'

export const FloatingLogo: FC = () => {
  return (
    <Box
      sx={{
        width: '60%',
        maxWidth: '330px',
        maxHeight: '770px',
        height: '70%',
        position: 'relative',
      }}
    >
      <Image src={Logo} alt="Mulo" fill />
    </Box>
  )
}
