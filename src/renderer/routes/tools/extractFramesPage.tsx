import { Alert, Checkbox, Snackbar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Progress from 'renderer/components/Progress';
import VideoSelect from 'renderer/components/FileSelect';
import { HistoryContext } from 'renderer/utils/context/HistoryContext';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import { SnackbarContext } from 'renderer/utils/context/SnackbarContext';
import {
  Container,
  HistoryBox,
  InputField,
  PrimaryButton,
} from 'renderer/utils/styled-components';
import { ProgressType, extractFramesInputType } from 'renderer/utils/types';
import { getNameFromPath } from 'util-functions';
import Moment from 'react-moment';

export default function ExtractFramesPage() {
  const { history } = useContext(HistoryContext);
  const [videopath, setVideoPath] = useState<string>();
  const { updatePage } = useContext(SelectedPageContext);
  const {updateSnackbar} = useContext(SnackbarContext)
  const [progress, setProgress] = useState<ProgressType | undefined>();
  const [fps, setFps] = useState<string>('1');
  const [customFps, setCustomFps] = useState<boolean>(false);

  useEffect(() => {
    updatePage('Video To Image Converter');
  });
  window.electron.ipcRenderer.on('extractFrames', (arg: any) => {
    if (typeof arg.percent === 'number') {
      setProgress(arg);
    } else if (arg[0] === true) {
      setTimeout(() => {
        updateSnackbar({
          open: true,
          message: arg[1],
          type: 'success',
        });
        setProgress(undefined);
      }, 2000);
    } else {
      setTimeout(() => {
        updateSnackbar({
          open: true,
          message: arg[1],
          type: 'error',
        });
        setProgress(undefined);
      }, 2000);
    }
  });

  const extractFrames = () => {
    if(!videopath) return updateSnackbar({open: true, message: "No Videopath", type: 'warning'})
    const obj: extractFramesInputType = {inputFile: videopath, fps: fps.length>0 && customFps? fps : undefined }
    window.electron.ipcRenderer.sendMessage('extractFrames', obj);
    setProgress({ percent: 1 });
  };

  return (
    <Container>
      <h1>Extract Frames</h1>
      Input:
      <VideoSelect key={1} type='video' onFileSelect={(path) => setVideoPath(path)} />
      <div className="flex">
        <div className='flex'><Checkbox
          checked={customFps}
          onChange={(e) => setCustomFps(e.target.checked)}
        />
          WithFrameRate
        </div>
        {customFps ? (
          <>
            {' '}
            <InputField
              min={'1'}
              max={'248'}
              value={fps}
              onChange={(e) => setFps(e.target.value)}
              type="number"
            />{' '}
            kbps
          </>
        ) : null}
      </div>
      {videopath && !progress && (!customFps || (fps.length > 0 && parseInt(fps) < 248)  ) ? (
        <div className="center">
          <PrimaryButton onClick={extractFrames}>Extract Frames</PrimaryButton>
        </div>
      ) : null}
      {progress ? (
        <Progress
          percent={progress.percent}
          remaining={progress.remaining}
          text={progress.text}
        />
      ) : null}
      {history?.extractFrames.map((item) => {
        const name = getNameFromPath(item.outputdir);
        return (
          <HistoryBox key={item.outputdir}>
            <div>
              Extracted frames to{' '}
              <a onClick={() => window.electron.shell.openPath(item.outputdir)}>
                {name.name}
              </a>
            </div>
            <div className='end'>
              <Moment format='HH:mm:ss' date={item.timestamp} />
            </div>
          </HistoryBox>
        );
      })}
    </Container>
  );
}
