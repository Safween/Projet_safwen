import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StorageIcon from '@mui/icons-material/Storage';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ImageIcon from '@mui/icons-material/Image';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ListIcon from '@mui/icons-material/List';
import PaymentIcon from '@mui/icons-material/Payment'; // Import the PaymentIcon
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <List>
        <ListItem button component={Link} to="/" onClick={toggleSidebar}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/patient-registration" onClick={toggleSidebar}>
          <ListItemIcon><PersonAddIcon /></ListItemIcon>
          <ListItemText primary="Patient Registration" />
        </ListItem>
        <ListItem button component={Link} to="/patient-scheduling" onClick={toggleSidebar}>
          <ListItemIcon><EventNoteIcon /></ListItemIcon>
          <ListItemText primary="Patient Scheduling" />
        </ListItem>
        <ListItem button component={Link} to="/results-storage" onClick={toggleSidebar}>
          <ListItemIcon><StorageIcon /></ListItemIcon>
          <ListItemText primary="Results Storage" />
        </ListItem>
        <ListItem button component={Link} to="/image-retrieval" onClick={toggleSidebar}>
          <ListItemIcon><ImageSearchIcon /></ListItemIcon>
          <ListItemText primary="Image Retrieval" />
        </ListItem>
        <ListItem button component={Link} to="/list" onClick={toggleSidebar}>
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary="Patient & Exam List" />
        </ListItem>
        <ListItem button component={Link} to="/billing" onClick={toggleSidebar}>
          <ListItemIcon><PaymentIcon /></ListItemIcon>  {/* Add this line */}
          <ListItemText primary="Billing" />  {/* Add this line */}
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/settings" onClick={toggleSidebar}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/help" onClick={toggleSidebar}>
          <ListItemIcon><HelpIcon /></ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
