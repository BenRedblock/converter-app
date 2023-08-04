import { Alert, Checkbox, LinearProgress, Snackbar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import {
  Container,
  InputField,
  PrimaryButton,
} from 'renderer/utils/styled-components';
import { SnachbarType } from 'renderer/utils/types';
import VideoSelect from 'renderer/components/VideoSelect';
import Dropdown from 'renderer/components/Dropdown';
import DestinationSelect from 'renderer/components/DestinationSelect';
import Progress from 'renderer/components/Progress';

export default function VideoConverterPage() {
  const [crf, setCRF] = useState(true);
  const [bitrate, setBitrate] = useState<string>('8000');
  const [inputPath, setInputPath] = useState<string | undefined>();
  const { updatePage } = useContext(SelectedPageContext);
  const [snackbar, setSnackbar] = useState<SnachbarType>({
    open: false,
    message: 'undefined',
    type: 'info',
  });
  const [progress, setProgress] = useState<number | undefined>();
  const [remaining, setRemaining] = useState<string | undefined>();
  const [format, setFormat] = useState<string>('1');
  const [destinationPath, setDestinationPath] = useState<string | undefined>();
  const Formats = [
    'VIDEO',
    'mp4',
    'mov',
    'avi',
    'webm',
    'gif',
    'AUDIO',
    'mp3',
    'adts',
    'wav',
    'flac',
  ];

  useEffect(() => {
    updatePage('Video Converter');
  });

  window.electron.ipcRenderer.on('video-convert', (arg: any) => {
    if (typeof arg.remaining === 'string') {
      if(arg.percent) setProgress(arg.percent);
      setRemaining(arg.remaining)
    } else if (arg[0] === true) {
      setTimeout(() => {setSnackbar({
        open: true,
        message: arg[1],
        type: 'success',
      });
      setProgress(undefined);
      setRemaining(undefined)},2000)
    } else if (arg[0] === false) {
      setTimeout(()=> {
        setSnackbar({
          open: true,
          message: arg[1],
          type: 'error',
        });
        setProgress(undefined);
        setRemaining(undefined)
      },2000)
    }
  });

  console.log(`Progress: ${progress}`)
  console.log(remaining)

  const clickConvert = () => {
    setProgress(1);
    window.electron.ipcRenderer.sendMessage('video-convert', {
      inputPath,
      format: Formats[parseInt(format)],
      destinationPath,
      videobitrate: crf ? undefined : bitrate,
    });
  };

  return (
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
      <h1>Video Converter</h1>
      Input:
      <VideoSelect key={1} onVideoSelect={(path) => setInputPath(path)} />
      Format:
      <Dropdown
        key={2}
        options={Formats}
        category={[0, 6]}
        select="1"
        onSelect={(e) => setFormat(e)}
      />
      <div className="flex">
        Video Bitrate:
        <div className="flex">
          <Checkbox checked={crf} onChange={(e) => setCRF(e.target.checked)} />
          Automatic
        </div>
      </div>
      {crf ? (
        <></>
      ) : (
        <div className="flex">
          <InputField
            value={bitrate}
            onChange={(e) => setBitrate(e.target.value)}
            type="number"
          />{' '}
          kbps
        </div>
      )}
      Output:
      <DestinationSelect
        key={3}
        onSelect={(e) => setDestinationPath(e)}
        fileName={inputPath?.split('.').shift()}
        format={Formats[parseInt(format)]}
      />
      {format && inputPath && destinationPath && (bitrate.length > 0 || crf) ? (
        <div style={{ display: 'grid', placeItems: 'center' }}>
          {progress ? (
            <Progress key={4} percent={progress} remaining={remaining} />
          ) : (
            <PrimaryButton onClick={clickConvert}>Convert</PrimaryButton>
          )}
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}
