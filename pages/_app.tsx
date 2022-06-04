import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Layout from '../components/layout';
import Script from "next/script";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta charSet="utf-8" />
                <title>Rômulo Bordezani</title>

                <meta name="robots" content="index, follow" />
                <meta name="description" content="Turning ideas into code." />
                <meta name="keywords"  content="romulo bordezani, romulobordezani, Rômulo, romulo, Bordezani, bordezani, euzebio, web, uol, lofty, development, site, portfolio, interface, front end, front, full stack, stack" />
                <meta name="author" content="Romulo Bordezani" />

                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="description" content="Turning ideas into code." />
                <meta property="og:url" content="https://www.romulobordezani.com.br/"/>
                <meta property="og:title" content="Romulo Bordezani"/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content="https://www.romulobordezani.com.br/images/ogimage.png"/>
                <meta property="og:image:secure_url" content="https://www.romulobordezani.com.br/images/ogimage.png"/>
                <meta property="og:site_name" content="Romulo Bordezani"/>
                <meta property="og:description" content="Turning ideas into code."/>
                <meta name="theme-color" content="#333333" />
                <link rel='SHORTCUT ICON' href='favicon.ico' />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </CacheProvider>
    );
}
