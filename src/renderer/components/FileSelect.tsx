import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { InputField } from 'renderer/utils/styled-components';
import { AudioFormats, VideoFormats } from 'renderer/utils/types';

interface Props {
  onFileSelect: (path: string | undefined) => void;
  type: 'video' | 'audio' | 'all';
}

export default function FileSelect({ onFileSelect, type }: Props) {
  const [filePath, setFilePath] = useState<string>();

  const handleFileSelect = () => {
    window.electron
      .openDialog({
        title: 'Select a File',
        properties: ['openFile'],
        filters: [
          {
            name: 'Videos',
            extensions: type === "video" ? VideoFormats : type === "audio" ? AudioFormats : [],
          },
        ],
      })
      .then((result) => {
        if (result.canceled) return;
        setFilePath(result.filePaths[0]);
      });
  };

  useEffect(() => {
    onFileSelect(filePath);
  }, [filePath]);

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
