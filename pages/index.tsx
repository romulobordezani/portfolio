import React, { useRef } from 'react';
import type { NextPage } from 'next';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import { AboutContent } from '../content/about';
import { RadioContent } from '../content/radio';
import SocialBar from '../components/layout/social-bar';
import { FloatingLogo } from '../components/layout/floating-logo';
import { Cloud } from '../components/cloud';

const Home: NextPage = () => {
  const parallax = useRef<IParallax>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
    }
  };

  const cloudStl = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

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
          display: 'flex',
          justifyContent: 'end',
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
        }}
      >
        <FloatingLogo />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        speed={0.1}
        factor={1}
        style={{ ...cloudStl, zIndex: 11 }}
      >
        <Cloud index={1} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0.5}
        speed={0.3}
        factor={1.5}
        style={{ ...cloudStl, zIndex: 12 }}
      >
        <Cloud index={2} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0.7}
        speed={1.5}
        factor={0.5}
        style={{ ...cloudStl, zIndex: 13 }}
      >
        <Cloud index={3} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0.2}
        speed={0.5}
        factor={0.5}
        style={{ ...cloudStl, zIndex: 14 }}
      >
        <Cloud index={4} />
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
  );
};

export default Home;
