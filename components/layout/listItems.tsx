import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Link from '../../src/Link';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} href="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} href="/about">
      <ListItemIcon>
        <PermContactCalendarIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PhotoLibraryIcon />
      </ListItemIcon>
      <ListItemText primary="Experience" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Contact" />
    </ListItemButton>
  </React.Fragment>
);
