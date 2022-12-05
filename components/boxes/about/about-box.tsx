import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SocialBar from '../../layout/social-bar';
import { useTheme } from '@mui/system';

const AboutBox: React.FC = () => {
    const theme = useTheme();

    const responsiveFont = {
        [theme.breakpoints.up('xl')]: {
            fontSize: '1.6rem'
        },
    }

    return (
        <Box sx={{ mh: '10%', padding: '10%' }}>
            <Typography sx={{ color: '#FFF' }} component="div">
                <Avatar
                    sx={{
                        width: 133,
                        height: 133,
                        [theme.breakpoints.down('lg')]: {
                            width: 66,
                            height: 66,
                        }
                    }}
                    alt="Rômulo E. Bordezani"
                    src="/images/romulo-bordezani-picture.png"
                />

                <Typography variant="body1" component="p" sx={{ ...responsiveFont, my: 4 }}>
                    Hello! My name is <Typography component="span" sx={{ ...responsiveFont, color: 'orange' }}>Romulo Bordezani</Typography>, I&apos;m a full-stack developer who has been working to make the Web more than just videos, memes and weird dances, since 2001.
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...responsiveFont, my: 4 }}>
                    My job is to help out companies to make their services and products accessible, turning codes into awesome experiences.
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...responsiveFont, my: 4 }}>
                    Can I be useful to your business? Please let me know via any one of these profiles down below. ✉️️
                </Typography>
            </Typography>
            <SocialBar />
        </Box>
    );
};

export default AboutBox;
