import { useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import DestinationSelect from 'renderer/components/DestinationSelect';
import Dropdown from 'renderer/components/Dropdown';
import FileSelect from 'renderer/components/FileSelect';
import Progress from 'renderer/components/Progress';
import { HistoryContext } from 'renderer/utils/context/HistoryContext';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import { SnackbarContext } from 'renderer/utils/context/SnackbarContext';
import {
  Container,
  HistoryBox,
  PrimaryButton,
} from 'renderer/utils/styled-components';
import { AudioConvertOptions, AudioFormats, ProgressType } from 'renderer/utils/types';
import { getNameFromPath } from 'util-functions';

export default function AudioConverterPage() {
  const { updatePage } = useContext(SelectedPageContext);
  const { history } = useContext(HistoryContext);
  const [progress, setProgress] = useState<ProgressType>();
  const [audiopath, setAudioPath] = useState<string | undefined>();
  const [format, setFormat] = useState<string>('0');
  const [destinationPath, setDestinationPath] = useState<string | undefined>();
  const { updateSnackbar } = useContext(SnackbarContext);

  const Formats = AudioFormats

  useEffect(() => {
    updatePage('Audio Converter');
  });

  window.electron.ipcRenderer.on('audio-convert', (arg: any) => {
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
    if (!destinationPath || !format || !audiopath) return updateSnackbar({open: true, message: "You have to provide fields", type: "warning"});
    setProgress({ percent: 1, remaining: 'Calculating Progress' });
    const options: AudioConvertOptions = {
      destinationPath,
      format: Formats[parseInt(format)],
      inputPath: audiopath,
    };
    window.electron.ipcRenderer.sendMessage('audio-convert', options);
  };

  return (
    <Container>
      <h1>Audio Converter</h1>
      Input:
      <FileSelect
        type="audio"
        key={1}
        onFileSelect={(path) => setAudioPath(path)}
      />
      Format:
      <Dropdown
        key={2}
        options={Formats}
        select="0"
        onSelect={(value) => setFormat(value)}
      />
      Output:
      <DestinationSelect
        key={3}
        onSelect={(value) => setDestinationPath(value)}
        fileName={audiopath?.split('.').shift()}
        format={Formats[parseInt(format)]}
      />
      {format && audiopath && destinationPath && !progress ? (
        <div className="center">
          <PrimaryButton onClick={clickConvert}>Convert</PrimaryButton>
        </div>
      ) : null}
      {progress ? (
        <Progress
          key={4}
          percent={progress.percent}
          remaining={progress.remaining}
          text={progress.text}
        />
      ) : null}
      {history?.AudioConvert.map((item) => {
        return (
          <HistoryBox>
            Converted{' '}
            <a
              onClick={() =>
                window.electron.shell.showItemInFolder(item.inputAudio)
              }
            >
              {getNameFromPath(item.inputAudio).name}
            </a>{' '}
            to{' '}
            <a
              onClick={() =>
                window.electron.shell.showItemInFolder(item.outputAudio)
              }
            >
              {getNameFromPath(item.outputAudio).name}
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
