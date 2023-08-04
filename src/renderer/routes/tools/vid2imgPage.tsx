import { Alert, LinearProgress, Snackbar } from '@mui/material';
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
  const [progress, setProgress] = useState<number | undefined>();

  useEffect(() => {
    updatePage('Video To Image Converter');
  }, []);

  window.electron.ipcRenderer.on('extractFrames', (progress: any) => {
    console.log(progress)
    if (typeof progress === 'number') setProgress(progress);
    else if (progress[0]) {
      setSnackbar({ open: true, message: progress[1], type: 'success' });
      setProgress(undefined);
    } else {
      setSnackbar({ open: true, message: progress[1], type: 'error' });
    }
  });

  const extractFrames = () => {
    console.log(videopath);
    window.electron.ipcRenderer.sendMessage('extractFrames', videopath);
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
      <h1>Extract Frames</h1>
      <SecondaryButton onClick={openDialog}>SelectVideo</SecondaryButton>
      <br />
      {videopath ? (
        <>
          Selected: {videopath}
          <br />
          {progress ? <div className='background'><LinearProgress variant="determinate"  value={progress} /></div> : <PrimaryButton onClick={extractFrames}>Extract Frames</PrimaryButton>}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
