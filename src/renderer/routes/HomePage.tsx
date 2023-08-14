import { useContext, useEffect, useState } from 'react';
import { Container } from 'renderer/utils/styled-components';

type UpdateType = {
  availible: boolean;
  downloaded: boolean;
  progress: number | undefined;
  version?: string;
  patchnotes?: string;
};

export default function HomePage() {
  const [update, setUpdate] = useState<UpdateType>();
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('update', 'check')
      .then((result: string[]) => {
        if (result.length === 2)
          setUpdate({
            availible: true,
            version: result[0],
            downloaded: false,
            progress: undefined,
            patchnotes: result[1],
          })
      }).catch((e) => console.log(e))
  },[]);

  window.electron.ipcRenderer.on('update', (arg, version, percent) => {
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
          <div className="update">
            {update?.progress ? (
              <text>Downloading update: {Math.round(update.progress)}%</text>
            ) : (
              // <>
              //   {update.patchnotes ? (
              //     <>
              //       <text>New Version: v{update?.version}</text><br />
              //       {update.patchnotes}
              //     </>
              //   ) : (
                  <text>New Version: v{update?.version}</text>
              //   )}
              // </>
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
      ) : null}
    </Container>
  );
}
