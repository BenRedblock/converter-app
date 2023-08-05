import { Alert, LinearProgress, Snackbar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Progress from 'renderer/components/Progress';
import VideoSelect from 'renderer/components/VideoSelect';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import {
  Container,
  PrimaryButton,
  SecondaryButton,
} from 'renderer/utils/styled-components';
import { SnachbarType, ipcMainresponse } from 'renderer/utils/types';

export default function extractFramesPage() {
  const [videopath, setVideoPath] = useState<string>();
  const { updatePage } = useContext(SelectedPageContext);
  const [snackbar, setSnackbar] = useState<SnachbarType>({
    open: false,
    message: 'undefined',
    type: 'info',
  });
  const [progress, setProgress] = useState<number | undefined>();
  const [remaining, setRemaining] = useState<string | undefined>();
  const [fps, setFps] = useState<number | undefined>();

  useEffect(() => {
    updatePage('Video To Image Converter');
  }, []);
  window.electron.ipcRenderer.on('extractFrames', (progress: any) => {
    if (typeof progress.percent === 'number') {
      setProgress(progress.percent);
      setRemaining(progress.remaining);
    } else if (progress[0] === true) {
      setTimeout(() => {setSnackbar({
        open: true,
        message: progress[1],
        type: 'success',
      });
      setProgress(undefined);
      setRemaining(undefined)},2000)
    } else {
      setTimeout(()=> {
        setSnackbar({
          open: true,
          message: progress[1],
          type: 'error',
        });
        setProgress(undefined);
        setRemaining(undefined)
      },2000)
    }
  });

  const extractFrames = () => {
    window.electron.ipcRenderer.sendMessage('extractFrames', videopath);
    setProgress(1)
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
      Input:
      <VideoSelect onVideoSelect={(path) => setVideoPath(path)} />
      {videopath ? (
        progress ? (
          <Progress percent={progress} remaining={remaining} />
        ) : (
          <div className='center'><PrimaryButton onClick={extractFrames}>Extract Frames</PrimaryButton></div>
        )
      ) : (
        <></>
      )}
    </Container>
  );
}
