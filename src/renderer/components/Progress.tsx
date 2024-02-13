import { LinearProgress } from '@mui/material';
import { getNameFromPath } from 'util-functions';

interface Props {
  percent: number;
  remaining: string | undefined;
  text: string | undefined;
}

export default function Progress({ percent, remaining, text }: Props) {
  return (
    <div style={{ minWidth: '100%' }} className="background">
      <LinearProgress variant="determinate" value={percent} />
      <div className="flex" style={{ marginTop: '10px' }}>
        {text ? (
          <button
            type="button"
            style={{ overflow: 'hidden' }}
            onClick={() => window.electron.shell.showItemInFolder(text)}
          >
            {getNameFromPath(text).name}
          </button>
        ) : null}
        {remaining ? <span>{remaining}</span> : null}
      </div>
    </div>
  );
}
