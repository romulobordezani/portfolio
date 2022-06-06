import React, { useRef } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SocialBar from '../components/social-bar';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import { cloud, sun } from '../components/layout/cloudy-back-ground/styles';

const Home: NextPage = () => {
    const parallax = useRef<IParallax>(null)

    const scroll = (to: number) => {
        console.log('clickou', to);
        if (parallax.current) {
            parallax.current.scrollTo(to)
        }
    }

    return (
        <Parallax
            ref={parallax}
            horizontal={false} pages={3} style={{ top: '0', left: '0', background: 'transparent' }}>

            <ParallaxLayer
                offset={0}
                speed={0.1}
                factor={1}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 11 }}>
                <Box sx={{ ...cloud(1) }}  />
            </ParallaxLayer>

            <ParallaxLayer
                offset={0.5}
                speed={0.3}
                factor={1.5}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 12 }}>
                <Box sx={{ ...cloud(2) }} />
            </ParallaxLayer>

            <ParallaxLayer
                offset={1.5}
                speed={0.5}
                factor={0.5}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 13 }}>
                <Box sx={{ ...cloud(3) }} />
            </ParallaxLayer>

            <ParallaxLayer
                offset={2}
                speed={0.5}
                factor={0.5}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 14 }}>
                <Box sx={{ ...cloud(4) }} />
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={-0.5} style={{
                background: 'linear-gradient(0deg, rgba(63,54,71,1) 0%, rgba(63,54,71,1) 79%, rgba(63,54,71,0) 100%)',
                position: 'absolute',
                zIndex: 1000
            }} />

            <ParallaxLayer
                offset={2}
                speed={2.5}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1001,
                    background: 'linear-gradient(180deg, rgba(63,54,71,1) 0%, rgba(63,54,71,1) 79%, rgba(63,54,71,0) 100%)',

            }}
            >
                <Box>

                    <Typography sx={{ color: '#FFF' }} component="div">
                        <Typography variant="h6" component="h1" gutterBottom>
                            About me 🤓
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ my: 4 }}>
                            I have been worked to make Web more than <strong>fun</strong>,
                            helping out companies to make theirs ideas and products accessible, since 2001.
                        </Typography>

                        <Typography variant="body1" component="p" sx={{ my: 4 }}>
                            Sophia&apos;s dad, Aline&apos;s husband and mama&apos;s beloved one, I&apos;m always busy trying to make them laugh.
                        </Typography>

                        <Typography variant="body1" component="p" sx={{ my: 4 }}>
                            Sometimes developing at the front-end, sometimes at the back, other times creating layouts or taking care of user experience experiments, I like to be useful.
                        </Typography>

                        <Typography variant="body1" component="p" sx={{ my: 4 }}>
                            Doesn&apos;t matter what, always trying to keep myself more fool than full and trying to do my best.
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    zIndex: 9
                }}>
                <Box sx={{ ...sun() }}  />
            </ParallaxLayer>
        </Parallax>
    );
};

export default Home;
