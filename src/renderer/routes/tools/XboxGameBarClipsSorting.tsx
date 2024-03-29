import { useContext } from 'react';
import { ConfigDataContext } from 'renderer/utils/context/ConfigDataContext';
import { SnackbarContext } from 'renderer/utils/context/SnackbarContext';
import {
  BigButton,
  Container,
  PrimaryButton,
} from 'renderer/utils/styled-components';
import { ipcMainresponse } from 'renderer/utils/types';

export default function XboxGameBarClipsSorting() {
  const { configData, updateData } = useContext(ConfigDataContext);
  const { updateSnackbar } = useContext(SnackbarContext);

  const handleClick = () => {
    window.electron
      .openDialog({
        properties: ['openDirectory'],
        defaultPath: configData?.xboxClipsPath,
      })
      .then(async (result) => {
        if (!result.canceled) {
          await window.electron.saveData({
            xboxClipsPath: result.filePaths[0],
          });
          updateData();
        }
      });
  };

  const ClickSort = () => {
    window.electron.ipcRenderer
      .invoke('xbox-clip-sorting', configData?.xboxClipsPath)
      .then((result: ipcMainresponse) => {
        if (result.completed)
          updateSnackbar({
            open: true,
            message: result.message,
            type: 'success',
          });
        else
          updateSnackbar({
            open: true,
            message: result.message,
            type: 'error',
          });
      });
  };
  return (
    <Container>
      <BigButton onClick={handleClick}>Choose Folder</BigButton>
      {configData && (
        <>
          <p>Selected: {configData.xboxClipsPath}</p>
          <PrimaryButton onClick={ClickSort}>Sort</PrimaryButton>
        </>
      )}
    </Container>
  );
}
