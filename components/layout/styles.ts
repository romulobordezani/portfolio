export const cloudyBackGround = {
  background: 'transparent url("../images/parallax/sky-bg-min.jpg") no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  height: '100vh',
  width: '100%',
};

export const cloud = (id: number) => {
  let responsiveMinPos = -700;
  let responsivemaxPos = 700;

  if (typeof window !== 'undefined') {
    responsiveMinPos = screen.width / 2 - screen.width;
    responsivemaxPos = screen.width * 1.2;
  }

  return {
    background: `transparent url("../../images/parallax/cloud-${id}-min.png") no-repeat`,
    backgroundSize: 'contain',
    backgroundPositionX:
      Math.floor(Math.random() * responsivemaxPos) + responsiveMinPos,
    opacity: `0.9`,
    width: '100%',
    height: '100%',
  };
};
