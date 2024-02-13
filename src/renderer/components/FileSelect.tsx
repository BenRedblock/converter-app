import FindInPageIcon from '@mui/icons-material/FindInPage';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { InputField } from 'renderer/utils/styled-components';
import { AudioFormats, VideoFormats } from 'renderer/utils/types';

interface Props {
  onFileSelect: (path: string | undefined) => void;
  type: 'video' | 'audio' | 'all';
}

export default function FileSelect({ onFileSelect, type }: Props) {
  const [filePath, setFilePath] = useState<string>();
  let extensions: string[] = [];
  if (type === 'video') {
    extensions = VideoFormats;
  } else if (type === 'audio') {
    extensions = AudioFormats;
  }

  const handleFileSelect = () => {
    window.electron
      .openDialog({
        title: 'Select a File',
        properties: ['openFile'],
        filters: [
          {
            name: 'Videos',
            extensions,
          },
        ],
      })
      .then((result) => {
        if (!result.canceled) setFilePath(result.filePaths[0]);
      });
  };

  useEffect(() => {
    onFileSelect(filePath);
  }, [filePath, onFileSelect]);

  return (
    <div className="flex">
      <InputField
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        style={{ flex: 1 }}
      />
      <IconButton onClick={handleFileSelect}>
        <FindInPageIcon />
      </IconButton>
    </div>
  );
}
