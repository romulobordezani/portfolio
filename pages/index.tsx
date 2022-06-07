import React, { useRef } from 'react';
import type { NextPage } from 'next';
import ReactPlayer from 'react-player/soundcloud'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SocialBar from '../components/social-bar';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import { cloud, sun } from '../components/layout/cloudy-back-ground/styles';
import Header from '../components/layout/header';
import { useTheme } from '@mui/system';
import Avatar from '@mui/material/Avatar';

const Home: NextPage = () => {
    const parallax = useRef<IParallax>(null);
    const theme = useTheme();

    const scroll = (to: number) => {
        if (parallax.current) {
            parallax.current.scrollTo(to)
        }
    }

    const cloudStl = {
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    }

    const responsiveFont = {
        [theme.breakpoints.up('xl')]: {
            fontSize: '1.6rem'
        },
    }

    return (
        <Parallax
            ref={parallax}
            horizontal={false}
            pages={3}
            style={{ top: '0', left: '0', background: 'transparent' }}
        >
            <ParallaxLayer
                offset={0}
                speed={0.1}
                factor={1}
                style={{ ...cloudStl, zIndex: 11 }}>
                <Box sx={{ ...cloud(1) }}  />
            </ParallaxLayer>

            <ParallaxLayer
                offset={0.5}
                speed={0.3}
                factor={1.5}
                style={{ ...cloudStl, zIndex: 12 }}>
                <Box sx={{ ...cloud(2) }} />
            </ParallaxLayer>

            <ParallaxLayer
                offset={0.7}
                speed={0.5}
                factor={0.5}
                style={{ ...cloudStl, zIndex: 13 }}>
                <Box sx={{ ...cloud(3) }} />
            </ParallaxLayer>

            <ParallaxLayer
                offset={1}
                speed={0.5}
                factor={0.5}
                style={{ ...cloudStl, zIndex: 14 }}>
                <Box sx={{ ...cloud(4) }} />
            </ParallaxLayer>


            <ParallaxLayer
                sticky={{ start: 0, end: 0.5 }}
            >
                <Header />
            </ParallaxLayer>

            <ParallaxLayer
                offset={1.1}
                speed={-0.5}
                factor={1}
                style={{
                    background: 'linear-gradient(0deg, rgba(63,54,71,1) 0%, rgba(63,54,71,1) 79%, rgba(63,54,71,0) 100%)',
                    position: 'absolute',
                    zIndex: 1000
                }}
            />

            <ParallaxLayer
                offset={1}
                speed={2.5}
                style={{
                    ...cloudStl,
                    zIndex: 1001,
                    background: 'linear-gradient(180deg, rgba(63,54,71,1) 0%, rgba(63,54,71,1) 79%, rgba(63,54,71,0) 100%)',
                }}
            >
                <Box sx={{ mh: '10%', padding: '10%' }}>
                    <Typography sx={{
                        color: '#FFF'
                    }} component="div">
                        <Avatar sx={{
                            width: 133,
                            height: 133,
                            [theme.breakpoints.down('lg')]: {
                                width: 66,
                                height: 66,
                            }
                        }} alt="Rômulo E. Bordezani" src="/images/romulo-bordezani-picture.png" />

                        <Typography variant="body1" component="p" sx={{ ...responsiveFont, my: 4 }}>
                            Hello! My name is <Typography component="span" sx={{ ...responsiveFont, color: 'orange' }}>Romulo Bordezani</Typography>, I&apos;m a full-stack developer who has been working to make the Web more than just videos, memes and weird dances, since 2001.
                        </Typography>

                        <Typography variant="body1" component="p" sx={{ ...responsiveFont, my: 4 }}>
                            My job is to help out companies to make their services and products accessible, turning codes into awesome experiences.
                        </Typography>

                        <Typography variant="body1" component="p" sx={{ ...responsiveFont, my: 4 }}>
                            Can I be useful to your business? Please let me know via any one of these profiles down below. ☎️
                        </Typography>
                    </Typography>
                    <SocialBar />
                </Box>
            </ParallaxLayer>

            <ParallaxLayer
                offset={0}
                speed={-1.2}
                factor={0.5}
                style={{
                    ...cloudStl,
                    color: 'white',
                    zIndex: 9
                }}>
                <Box sx={{ ...sun() }}  />
            </ParallaxLayer>

            <ParallaxLayer
                style={{
                    ...cloudStl,
                    zIndex: 1100,
                    backgroundColor: 'rgba(63,54,71,1)'
                }}
                offset={2}
                speed={1}
                factor={1}
            >
                <ReactPlayer url='https://soundcloud.com/romulo-bordezani' controls={true} />
            </ParallaxLayer>
        </Parallax>
    );
};

export default Home;
