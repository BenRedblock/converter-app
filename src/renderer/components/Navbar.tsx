import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { NavigationItem } from '../utils/styled-components';
import { useContext } from 'react';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import MaximizeIcon from '@mui/icons-material/Maximize';
import './components-styles.css'

export default function Navbar() {
  const {page} = useContext(SelectedPageContext)

  return (
    <div style={{ backgroundColor: "#2b2b2b", minHeight: "40px", display: "flex", justifyContent: "space-between"}}>
      <div className='TitleBar'>Menu</div>
      <div className='Actions'>
        <MaximizeIcon className='Item'/>
        <MinimizeIcon className='Item'/>
        <CloseIcon className='Item'/>
      </div>
      {/* <div> */}
        {/* <Toolbar />
        <Divider />
        <List>
        {['Inbox', 'Video to Image Converter', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            {text === page ? <ListItemButton selected>
              <ListItemText primary={text} />
            </ListItemButton> :
            <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>}
            
          </ListItem>
        ))}
        </List> */}
        {/* converter: */}
        {/* <NavigationItem>Video to Image Converter</NavigationItem>
        <NavigationItem>GIF to JPG</NavigationItem>
        <NavigationItem>PNG to JPG</NavigationItem>
        <NavigationItem>SVG to PNG</NavigationItem>
        <NavigationItem>SVG to JPG</NavigationItem>
        <NavigationItem>Video to GIF</NavigationItem> */}
        {/* optimizer: */}
        {/* <NavigationItem>JPG optimizer</NavigationItem>
        <NavigationItem>PNG optimizer</NavigationItem>
        <NavigationItem>WebP optimizer</NavigationItem>
        <NavigationItem>GIF optimizer</NavigationItem> */}
        {/* resize: */}
        {/* <NavigationItem></NavigationItem> */}
        {/* effects: */}
        {/* <NavigationItem>Reverse GIF</NavigationItem>
        <NavigationItem>Adjust GIF speed</NavigationItem>
        <NavigationItem>Blur image/GIF</NavigationItem> */}
    </div>
  );
}
