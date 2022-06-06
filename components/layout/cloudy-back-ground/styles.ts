interface IObjectKeys {
    [key: number]: string;
}

const getDynamicPercentage = (id: number): string => {
    const positionOptions: IObjectKeys  = {
        1: '-0%',
        2: '10%',
        3: '50%',
        4: '0%'
    }

    return positionOptions[id];
}

export const sun = () => {
    return {
        position: 'fixed',
        // transition: 'all 1s linear',
        zIndex: 0,
        background: 'white',
        borderRadius: '50%',
        width: '150px!important',
        height: '150px!important',
        left: 'unset!important',
        top: '100px',
        right: '200px',
        opacity: '0.5',
        boxShadow:
            `inset 0 0 50px #ffffff,
             0 0 50px #fff,
             -10px 0 80px #ff5100,
             10px 0 80px #ffdd00`,
    }
}

export const cloud = (id: number) => {
    return {
        background: `transparent url("../../images/parallax/cloud-${id}.png") no-repeat`,
        backgroundSize: 'contain',
        opacity: `0.7`,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    }
};
