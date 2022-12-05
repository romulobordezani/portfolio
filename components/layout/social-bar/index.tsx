import * as React from 'react';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { SocialButton } from "../social-button";

const SocialBar: React.FC = () => {
    return (
        <Box>
            <SocialButton href="mailto:romulobordezani@gmail.com">
                <EmailIcon />
            </SocialButton>

            <SocialButton href="https://www.linkedin.com/in/romulobordezani/" target="_BLANK" rel="noreferrer">
                <LinkedInIcon />
            </SocialButton>

            <SocialButton href="https://twitter.com/romulobordezani" target="_BLANK" rel="noreferrer">
                <TwitterIcon />
            </SocialButton>

            <SocialButton href="https://github.com/romulobordezani" target="_BLANK" rel="noreferrer">
                <GitHubIcon />
            </SocialButton>

            <SocialButton href="https://www.instagram.com/mulo.art/" target="_BLANK" rel="noreferrer">
                <InstagramIcon />
            </SocialButton>
        </Box>
    );
};

export default SocialBar;
