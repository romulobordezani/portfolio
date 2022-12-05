export const sun = () => {
    return {
        position: 'fixed',
        zIndex: 0,
        background: 'white',
        borderRadius: '50%',
        width: '150px!important',
        height: '150px!important',
        left: 'unset!important',
        top: '100px',
        right: '300px',
        color: '#2C2632',
        boxShadow:
            `inset 0 0 50px #ffffff,
             0 0 50px #fff,
             -10px 0 80px #ff5100,
             10px 0 80px #ffdd00`,
    }
}

export const cloud = (id: number, initialPos: number = -300, finalPos: number = 700) => {
    return {
        background: `transparent url("../../images/parallax/cloud-${id}-min.png") no-repeat`,
        backgroundSize: 'contain',
        backgroundPositionX: Math.floor(Math.random() * finalPos) + initialPos,
        opacity: `0.9`,
        width: '100%',
        height: '100%',
    }
};

export const cloudyBackGround = {
    background: 'transparent url("../images/parallax/sky-bg-min.jpg") no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100%',
}
