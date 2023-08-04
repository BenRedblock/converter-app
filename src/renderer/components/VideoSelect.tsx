import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { InputField } from 'renderer/utils/styled-components';

interface Props {
  onVideoSelect: (path: string | undefined) => void;
}

export default function VideoSelect({ onVideoSelect }: Props) {
  const [videoPath, setVideoPath] = useState<string>();

  const handleFileSelect = () => {
    window.electron
      .openDialog({
        title: 'Select a Video',
        properties: ['openFile'],
        filters: [
          {
            name: 'Videos',
            extensions: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv'],
          },
        ],
      })
      .then((result) => {
        if (result.canceled) return;
        setVideoPath(result.filePaths[0]);
      });
  };

  useEffect(() => {
    onVideoSelect(videoPath);
  }, [videoPath]);

  return (
    <div className="flex">
      <InputField
        value={videoPath}
        onChange={(e) => setVideoPath(e.target.value)}
        style={{ flex: 1 }}
      />
      <IconButton onClick={handleFileSelect}>
        <FindInPageIcon />
      </IconButton>
    </div>
  );
}
