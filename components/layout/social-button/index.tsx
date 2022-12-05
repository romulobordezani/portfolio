import {styled} from "@mui/system";
import MuiIconButton from "@mui/material/IconButton";
import { IconButtonProps } from "@mui/material/IconButton";

interface IconButtonLinkProps extends IconButtonProps {
    href: string;
    target?: string;
    rel?: string;
}

export const SocialButton = styled(MuiIconButton)<IconButtonLinkProps>(
    ({ theme}) => ({
        color: theme.palette.rblack.contrastText,
        transition: 'color 0.2s ease-in',
        '&:hover': {
            color: '#cd5804',
            transition: 'color 0.3s ease-out',
        }
    })
);
