import { Alert, Snackbar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import {
  Container,
  PrimaryButton,
  SecondaryButton,
} from 'renderer/utils/styled-components';
import { SnachbarType, ipcMainresponse } from 'renderer/utils/types';

export default function Vid2ImgPage() {
  const [videopath, setVideoPath] = useState<string>();
  const { updatePage } = useContext(SelectedPageContext);
  const [snackbar, setSnackbar] = useState<SnachbarType>({
    open: false,
    message: 'undefined',
    type: 'info',
  });

  useEffect(() => {
    updatePage('Video To Image Converter');
  }, []);

  const extractFrames = () => {
    window.electron.ipcRenderer
      .invoke('extractFrames', videopath)
      .then((result: ipcMainresponse) => {
        if (result.completed)
          setSnackbar({ open: true, message: result.message, type: 'success' });
      });
  };
  const openDialog = () => {
    window.electron
      .openDialog({
        properties: ['openFile'],
        filters: [{ name: 'Videos', extensions: ['mp4', 'mov', 'avi'] }],
      })
      .then((result) => {
        if (result.canceled) return;
        setVideoPath(result.filePaths[0]);
        console.log(result.filePaths);
      });
  };

  return (
    //html
    <Container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '', type: 'info' })}
      >
        <Alert
          onClose={() =>
            setSnackbar({ open: false, message: '', type: 'info' })
          }
          severity={snackbar.type}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <SecondaryButton onClick={openDialog}>SelectVideo</SecondaryButton><br/>
      {videopath ? (
        <>
          <text>Selected: {videopath}</text><br/>
          <PrimaryButton onClick={extractFrames}>Extract Frames</PrimaryButton><br/>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
