import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedPageContext } from 'renderer/utils/context/SelectedPageContext';
import { Container, Page } from 'renderer/utils/styled-components';

type UpdateType = {
  availible: boolean;
  downloaded: boolean;
  progress: number | undefined;
  version?: string;
};

export function HomePage() {
  const [update, setUpdate] = useState<UpdateType>();
  const navigate = useNavigate();
  const { updatePage } = useContext(SelectedPageContext);
  useEffect(() => {
    updatePage('Home');
  }, []);

  window.electron.ipcRenderer.on('update', (arg, version, percent) => {
    console.log("update")
    if (arg === 'available' && typeof version === 'string') {
      setUpdate({ availible: true, version, downloaded: false, progress: undefined });
    }
    if (arg === 'ready' && typeof version === 'string')
      setUpdate({
        version,
        availible: true,
        downloaded: true,
        progress: undefined,
      });
    if (
      arg === 'progress' &&
      typeof percent === 'number' &&
      typeof version === 'string'
    )
      setUpdate({
        availible: true,
        downloaded: false,
        progress: percent,
        version,
      });
  });
  return (
    <Container>
      {update?.availible ? (
        <>
          <div className="update">
            {update?.progress ? (
              <text>Downloading update: {Math.round(update.progress)}%</text>
            ) : (
              <text>New Version: v{update?.version}</text>
            )}
            {update?.downloaded ? (
              <>
                <button
                  onClick={() =>
                    window.electron.ipcRenderer.sendMessage('update', 'ready')
                  }
                >
                  Update and Restart
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  window.electron.ipcRenderer.sendMessage('update', 'download')
                }
              >
                Download update
              </button>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
