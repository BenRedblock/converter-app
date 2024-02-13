import CloseIcon from '@mui/icons-material/Close';
import Crop32Icon from '@mui/icons-material/Crop32';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './components-styles.css';

export default function Navbar() {
  const location = useLocation();
  const [drawer, setDrawer] = useState<boolean>(false);
  const navigate = useNavigate();

  const drawerWidth = 240;

  const sites = [
    {
      name: 'Video To Image Converter',
      url: '/tools/vid2img',
    },
    {
      name: 'Xbox Clip sorting',
      url: '/tools/xbox-sorting',
    },
    {
      name: 'Video Converter',
      url: '/tools/video-converter',
    },
    {
      name: 'Audio Converter',
      url: '/tools/audio-converter',
    },
  ];

  const drawerHTML = (
    <div>
      <List>
        <ListItem
          key="Home"
          disablePadding
          onClick={() => {
            navigate('/');
            setDrawer(false);
          }}
        >
          {location.pathname === '/' ? (
            <ListItemButton selected>
              <ListItemText primary="Home" />
            </ListItemButton>
          ) : (
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
          )}
        </ListItem>
        <Divider />
        {sites.map((site) => (
          <ListItem
            key={site.name}
            disablePadding
            onClick={() => {
              navigate(site.url);
              setDrawer(false);
            }}
          >
            {site.url === location.pathname ? (
              <ListItemButton selected>
                <ListItemText primary={site.name} />
              </ListItemButton>
            ) : (
              <ListItemButton>
                <ListItemText primary={site.name} />
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
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
            <div style={{ fontSize: '25px', cursor: 'pointer' }}>Converter</div>
          </Link>
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
