import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Drawer,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Crop32Icon from '@mui/icons-material/Crop32';
import MenuIcon from '@mui/icons-material/Menu';
import './components-styles.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation()
  const [drawer, setDrawer] = useState<boolean>(false);
  const navigate = useNavigate();

  const drawerWidth = 240;

  const urls = ['/tools/vid2img', "/tools/xbox-sorting", "/tools/video-converter", "/tools/audio-converter"];

  const drawerHTML = (
    <div>
      <List>
        <ListItem
          key={'Home'}
          disablePadding
          onClick={() => {
            navigate('/');
            setDrawer(false);
          }}
        >
          {'/' === location.pathname ? (
            <ListItemButton selected>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          ) : (
            <ListItemButton>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          )}
        </ListItem>
        <Divider />
        {[
          'Video To Image Converter',
          'Xbox Clip sorting',
          'Video Converter',
          'Audio Converter'
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => {
              navigate(urls[index]);
              setDrawer(false);
            }}
          >
            {urls[index] === location.pathname ? (
              <ListItemButton selected>
                <ListItemText primary={text} />
              </ListItemButton>
            ) : (
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <div
        style={{
          backgroundColor: '#2b2b2b',
          minHeight: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}
        >
          <IconButton onClick={() => setDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <div
            style={{ fontSize: '25px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Converter
          </div>
        </div>
        <div className="TitleBar">``</div>
        <div className="Actions">
          <HorizontalRuleIcon
            id="minimizeBtn"
            className="Item"
            onClick={() =>
              window.electron.ipcRenderer.sendMessage('close', 'minimizeApp')
            }
          />
          <Crop32Icon
            id="maximizeBtn"
            className="Item"
            onClick={() =>
              window.electron.ipcRenderer.sendMessage('close', 'maximizeApp')
            }
          />
          <CloseIcon
            id="closeBtn"
            className="Item"
            onClick={() =>
              window.electron.ipcRenderer.sendMessage('close', 'closeApp')
            }
          />
        </div>
      </div>
      <Drawer
        variant="temporary"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        {drawerHTML}
      </Drawer>
    </>
  );
}
