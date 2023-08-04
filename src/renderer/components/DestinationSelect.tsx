import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { InputField } from 'renderer/utils/styled-components';
import FindInPageIcon from '@mui/icons-material/FindInPage';

interface Props {
  onSelect: (destination: string | undefined) => void;
  format: string;
  fileName: string | (() => string | undefined) | undefined;
}

export default function DestinationSelect({
  onSelect,
  fileName,
  format,
}: Props) {
  const [selected, setSelected] = useState<string>();

  const handleDestinationSelect = () => {
    window.electron
      .saveDialog({
        properties: ['createDirectory'],
        title: 'Select a location to save',
        defaultPath: `${fileName ? fileName : ''}-converted.${format}`,
        filters: [{ name: 'Videos', extensions: [format] }],
      })
      .then((result) => {
        if (result.canceled || !result.filePath) return;
        setSelected(result.filePath);
      });
  };

  useEffect(()=> {
    onSelect(selected)
  },[selected])

  return (
    <div className="flex">
      <InputField
        value={selected}
        onChange={(e) =>
          setSelected(e.target.value)}
        style={{ flex: 1 }}
      />
      <IconButton onClick={handleDestinationSelect}>
        <FindInPageIcon />
      </IconButton>
    </div>
  );
}
