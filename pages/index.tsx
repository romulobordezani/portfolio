import React, { useRef } from 'react';
import type { NextPage } from 'next';
import ReactPlayer from 'react-player/soundcloud'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import {cloud, cloudyBackGround, sun} from '../components/layout/cloudy-back-ground/styles';
import Header from '../components/layout/header';
import { useTheme } from '@mui/system';
import AboutBox from '../components/boxes/about/about-box';
import { Property } from "csstype";

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

    return (
        <Parallax
            ref={parallax}
            horizontal={false}
            pages={2}
            style={{ top: '0', left: '0', background: 'transparent' }}
        >
            <ParallaxLayer
                sticky={{ start: 0  }}
                style={{ ...cloudStl, zIndex: 10000 }}
            >
                <Header />
            </ParallaxLayer>

            <ParallaxLayer
                offset={0}
                speed={0.1}
                factor={1}
            >
                <Box sx={{ ...cloudyBackGround }} />
            </ParallaxLayer>

            <ParallaxLayer
                offset={0.05}
                speed={-0.07}
                factor={2}
                style={{ ...cloudStl }}
            >
                <Box sx={{ ...sun() }} />
            </ParallaxLayer>

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
                speed={1.5}
                factor={0.5}
                style={{ ...cloudStl, zIndex: 13 }}>
                <Box sx={{ ...cloud(3) }} />
            </ParallaxLayer>

            <ParallaxLayer
                offset={0.2}
                speed={0.5}
                factor={0.5}
                style={{ ...cloudStl, zIndex: 14 }}>
                <Box sx={{ ...cloud(4) }} />
            </ParallaxLayer>

            <ParallaxLayer
                offset={1}
                speed={2.5}
                style={{
                    ...cloudStl,
                    zIndex: 1001,
                    background: 'linear-gradient(180deg, rgba(63,54,71,1) 0%, rgba(63,54,71,1) 79%, rgba(63,54,71,0) 100%)',
                }}
            >
                <AboutBox />
            </ParallaxLayer>


            {/*<ParallaxLayer
                offset={1}
                speed={-0.5}
                factor={1}
                style={{
                    backgroundColor: 'rgba(63,54,71,1)',
                    background: 'linear-gradient(0deg, rgba(63,54,71,1) 0%, rgba(63,54,71,1) 79%, rgba(63,54,71,0) 100%)',
                    position: 'absolute',
                    zIndex: 1000
                }}
            />*/}

            {/**/}



            {/*<ParallaxLayer
                style={{
                    ...cloudStl,
                    zIndex: 1100,
                    backgroundColor: 'rgb(44,38,50)'
                }}
                offset={2}
                speed={1.5}
                factor={1}
            >
                <Box>
                    <Typography variant="body1" component="div" sx={{
                        [theme.breakpoints.up('xl')]: {
                            fontSize: '1.6rem',
                        },
                        padding: '10px',
                        color: 'white',
                        mb: 3
                    }}>
                        What about some of my blues to hear for a while?
                    </Typography>
                    <ReactPlayer width="100%" url='https://soundcloud.com/romulo-bordezani' controls={true} />
                </Box>
            </ParallaxLayer>*/}
        </Parallax>
    );
};

export default Home;
