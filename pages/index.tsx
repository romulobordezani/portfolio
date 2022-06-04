import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import IconFaceBook from '../public/images/socials/ico_facebook.svg';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <Container maxWidth="lg">
            <Head>

            </Head>
            <Box>
                <Box>
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

                    <Typography variant="body1" component="p" sx={{ my: 4 }}>
                        <a href="mailto:romulobordezani@gmail.com">romulobordezani@gmail.com</a>
                    </Typography>

                    <Box>
                        <IconButton href="https://www.facebook.com/romulobordezani" target="_BLANK" rel="noreferrer">
                            <img src={IconFaceBook} height={25} width={25}  alt="Facebook Profile" />
                        </IconButton>

                        <IconButton href="https://www.linkedin.com/in/romulobordezani/" target="_BLANK" rel="noreferrer">
                            <img src="/images/socials/ico_linkedin.svg" height={25} width={25} alt="Facebook Profile" />
                        </IconButton>

                        <IconButton href="https://twitter.com/romulobordezani" target="_BLANK" rel="noreferrer">
                            <img src="/images/socials/ico_twitter.svg" height={25} width={25} />
                        </IconButton>

                        <IconButton href="https://github.com/romulobordezani" target="_BLANK" rel="noreferrer">
                            <img src="/images/socials/ico-github.svg" height={25} width={25} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
