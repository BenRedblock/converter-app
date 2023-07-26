import { Alert, Snackbar } from '@mui/material';
import { dialog } from 'electron';
import { useContext, useEffect, useState } from 'react';
import { ConfigDataContext } from 'renderer/utils/context/ConfigDataContext';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import { BigButton, PrimaryButton } from 'renderer/utils/styled-components';
import { SnachbarType, ipcMainresponse } from 'renderer/utils/types';

export default function XboxGameBarClipsSorting() {
  const { updatePage } = useContext(SelectedPageContext);
  const { configData, updateData } = useContext(ConfigDataContext);
  const [response, setResponse] = useState<undefined | boolean | string>(
    undefined
  );
  const [snackbar, setSnackbar] = useState<SnachbarType>({
    open: false,
    message: 'undefined',
    type: 'info',
  });

  useEffect(() => {
    updatePage('Xbox Clip sorting');
  }, []);

  const handleClick = () => {
    window.electron
      .openDialog({
        properties: ['openDirectory'],
        defaultPath: configData?.xboxClipsPath,
      })
      .then(async (result) => {
        if (!result.canceled) {
          await window.electron
            .saveData({ xboxClipsPath: result.filePaths[0] })
            .then((result) => updateData());
        }
      });
  };

  const ClickSort = () => {
    window.electron.ipcRenderer
      .invoke('xbox-clip-sorting', configData?.xboxClipsPath)
      .then((result: ipcMainresponse) => {
        if (result.completed)
          setSnackbar({ open: true, message: result.message, type: 'success' });
        else setSnackbar({ open: true, message: result.message, type: "error"})
      });
  };
  return (
    <div>
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
      <BigButton onClick={handleClick}>Choose Folder</BigButton>
      {configData && (
        <>
          <p>Selected: {configData.xboxClipsPath}</p>
          <PrimaryButton onClick={ClickSort}>Sort</PrimaryButton>
        </>
      )}
    </div>
  );
}
