import React, { useRef } from 'react'
import type { NextPage } from 'next'
import Box from '@mui/material/Box'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import {
  cloud,
  cloudyBackGround,
} from '../components/layout/cloudy-back-ground/styles'
import { AboutContent } from '../components/content/about'
import { RadioContent } from '../components/content/radio'
import SocialBar from '../components/layout/social-bar'
import { FloatingLogo } from '../components/layout/floating-logo'

const Home: NextPage = () => {
  const parallax = useRef<IParallax>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to)
    }
  }

  const cloudStl = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <Parallax
      ref={parallax}
      horizontal={false}
      pages={3}
      style={{ top: '0', left: '0', background: 'transparent' }}
    >
      <ParallaxLayer
        sticky={{ start: 0, end: 3 }}
        style={{
          width: '100%',
          height: 'fit-content',
          position: 'absolute',
          top: 0,
          display: 'flex',
          justifyContent: 'end',
          right: 0,
          zIndex: 10001,
          padding: '1rem',
        }}
      >
        <SocialBar />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        speed={-0.07}
        factor={1}
        style={{
          ...cloudStl,
          justifyContent: 'start',
          zIndex: 10000,
          position: 'absolute',
          top: 0,
        }}
      >
        <FloatingLogo />
      </ParallaxLayer>

      <ParallaxLayer offset={0} speed={0.1} factor={1}>
        <Box sx={{ ...cloudyBackGround }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        speed={0.1}
        factor={1}
        style={{ ...cloudStl, zIndex: 11 }}
      >
        <Box sx={{ ...cloud(1) }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0.5}
        speed={0.3}
        factor={1.5}
        style={{ ...cloudStl, zIndex: 12 }}
      >
        <Box sx={{ ...cloud(2) }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0.7}
        speed={1.5}
        factor={0.5}
        style={{ ...cloudStl, zIndex: 13 }}
      >
        <Box sx={{ ...cloud(3) }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0.2}
        speed={0.5}
        factor={0.5}
        style={{ ...cloudStl, zIndex: 14 }}
      >
        <Box sx={{ ...cloud(4) }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={2.5} style={{ zIndex: 10001 }}>
        <AboutContent />
      </ParallaxLayer>
      <ParallaxLayer
        style={{
          ...cloudStl,
          zIndex: 1102,
        }}
        offset={2}
      >
        <RadioContent />
      </ParallaxLayer>
    </Parallax>
  )
}

export default Home
