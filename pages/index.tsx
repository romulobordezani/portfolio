import React, { useRef } from 'react'
import type { NextPage } from 'next'
import ReactPlayer from 'react-player/soundcloud'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import {
  cloud,
  cloudyBackGround,
  sun,
} from '../components/layout/cloudy-back-ground/styles'
import Header from '../components/layout/header'
import { useTheme } from '@mui/system'
import { AboutContent } from '../components/content/about'
import { Property } from 'csstype'
import { RadioContent } from '../components/content/radio'

const Home: NextPage = () => {
  const parallax = useRef<IParallax>(null)

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
        sticky={{ start: 0 }}
        style={{ ...cloudStl, zIndex: 10000 }}
      >
        <Header />
      </ParallaxLayer>

      <ParallaxLayer offset={0} speed={0.1} factor={1}>
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
