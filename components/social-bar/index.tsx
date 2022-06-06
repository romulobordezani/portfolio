import * as React from 'react';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { styled } from '@mui/system';

interface IconButtonLinkProps extends IconButtonProps {
    href: string;
    target?: string;
    rel?: string;
}

const IconButton = styled(MuiIconButton)<IconButtonLinkProps>(
    ({ theme}) => ({
        color: theme.palette.rblack.contrastText,
        transition: 'color 0.2s ease-in',
        '&:hover': {
            color: '#cd5804',
            transition: 'color 0.3s ease-out',
        }
    })
);

const SocialBar: React.FC = () => {
    return (
        <Box>
            <IconButton href="mailto:romulobordezani@gmail.com">
                <EmailIcon />
            </IconButton>

            <IconButton href="https://www.linkedin.com/in/romulobordezani/" target="_BLANK" rel="noreferrer">
                <LinkedInIcon />
            </IconButton>

            <IconButton href="https://twitter.com/romulobordezani" target="_BLANK" rel="noreferrer">
                <TwitterIcon />
            </IconButton>

            <IconButton href="https://github.com/romulobordezani" target="_BLANK" rel="noreferrer">
                <GitHubIcon />
            </IconButton>
        </Box>
    );
};

export default SocialBar;
