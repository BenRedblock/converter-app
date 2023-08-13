import { Alert, Checkbox, Snackbar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import {
  Container,
  HistoryBox,
  InputField,
  PrimaryButton,
} from 'renderer/utils/styled-components';
import { AudioFormats, ProgressType, VideoFormats } from 'renderer/utils/types';
import VideoSelect from 'renderer/components/FileSelect';
import Dropdown from 'renderer/components/Dropdown';
import DestinationSelect from 'renderer/components/DestinationSelect';
import Progress from 'renderer/components/Progress';
import { HistoryContext } from 'renderer/utils/context/HistoryContext';
import { getNameFromPath } from 'util-functions';
import { SnackbarContext } from 'renderer/utils/context/SnackbarContext';
import FileSelect from 'renderer/components/FileSelect';
import Moment from 'react-moment';

export default function VideoConverterPage() {
  const [crf, setCRF] = useState(true);
  const [bitrate, setBitrate] = useState<string>('8000');
  const { history } = useContext(HistoryContext);
  const [inputPath, setInputPath] = useState<string | undefined>();
  const { updatePage } = useContext(SelectedPageContext);
  const { updateSnackbar } = useContext(SnackbarContext);
  const [progress, setProgress] = useState<ProgressType | undefined>();
  const [format, setFormat] = useState<string>('1');
  const [destinationPath, setDestinationPath] = useState<string | undefined>();
  // const Formats = [
  //   'VIDEO',
  //   'mp4',
  //   'mov',
  //   'avi',
  //   'webm',
  //   'gif',
  //   'AUDIO',
  //   'mp3',
  //   'aac',
  //   'ac3',
  //   'eac3',
  //   'dts',
  //   'wav',
  //   'flac',
  //   'ogg',
  // ];
  const Formats = [
    'VIDEO',
    ...VideoFormats,
    'AUDIO',
    ...AudioFormats
  ]
  useEffect(() => {
    updatePage('Video Converter');
  });

  window.electron.ipcRenderer.on('video-convert', (arg: any) => {
    if (arg.remaining && arg.percent && progress !== undefined) {
      setProgress(arg);
    } else if (arg[0] === true) {
      setProgress(undefined);
      updateSnackbar({
        open: true,
        message: arg[1],
        type: 'success',
      });
    } else if (arg[0] === false) {
      setProgress(undefined);
      updateSnackbar({
        open: true,
        message: arg[1],
        type: 'error',
      });
    }
  });

  const clickConvert = () => {
    setProgress({ percent: 1, remaining: 'Calculating Progress' });
    window.electron.ipcRenderer.sendMessage('video-convert', {
      inputPath,
      format: Formats[parseInt(format)],
      destinationPath,
      videobitrate: crf ? undefined : bitrate,
    });
  };

  return (
    <Container>
      <h1>Video Converter</h1>
      Input:
      <FileSelect
        type="video"
        key={1}
        onFileSelect={(path) => setInputPath(path)}
      />
      Format:
      <Dropdown
        key={2}
        options={Formats}
        category={[0, 7]}
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
      {format &&
      inputPath &&
      destinationPath &&
      !progress &&
      (bitrate.length > 0 || crf) ? (
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <PrimaryButton onClick={clickConvert}>Convert</PrimaryButton>
        </div>
      ) : (
        <></>
      )}
      {progress ? (
        <Progress
          key={4}
          percent={progress.percent}
          remaining={progress.remaining}
          text={progress.text}
        />
      ) : null}
      {history?.VideoConvert.map((item) => {
        return (
          <HistoryBox>
            Converted{' '}
            <a
              onClick={() =>
                window.electron.shell.showItemInFolder(item.inputVideo)
              }
            >
              {getNameFromPath(item.inputVideo).name}
            </a>{' '}
            to{' '}
            <a
              onClick={() =>
                window.electron.shell.showItemInFolder(item.outputVideo)
              }
            >
              {getNameFromPath(item.outputVideo).name}
            </a>
            <div className='end'>
              <Moment format='HH:mm:ss' date={item.timestamp} />
            </div>
          </HistoryBox>
        );
      })}
    </Container>
  );
}
