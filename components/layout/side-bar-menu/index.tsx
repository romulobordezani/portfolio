import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Link from '../../../src/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ListItemText from '@mui/material/ListItemText';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export interface SideBarMenuProps {
    toggleDrawer: () => void
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ toggleDrawer }) => {
    return (
        <List component="nav">
            <React.Fragment>
                <ListItemButton component={Link} href="/" onClick={toggleDrawer}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton component={Link} href="/about" onClick={toggleDrawer}>
                    <ListItemIcon>
                        <PermContactCalendarIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItemButton>

                <ListItemButton onClick={toggleDrawer}>
                    <ListItemIcon>
                        <PhotoLibraryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Works" />
                </ListItemButton>

                <ListItemButton onClick={toggleDrawer}>
                    <ListItemIcon>
                        <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Contact" />
                </ListItemButton>
            </React.Fragment>
        </List>
    );
};

export default SideBarMenu;
