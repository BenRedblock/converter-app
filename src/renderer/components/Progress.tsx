import { LinearProgress } from '@mui/material';
import { shell } from 'electron';
import { getNameFromPath } from 'util-functions';

interface Props {
  percent: number;
  remaining: string | undefined;
  text: string | undefined
}

export default function Progress({ percent, remaining, text }: Props) {
  return (
    <div style={{ minWidth: '100%' }} className="background">
      <LinearProgress variant="determinate" value={percent} />
      <div className="flex" style={{marginTop: "10px",}}>
      {text ? <a style={{overflow: "hidden"}} onClick={() => window.electron.shell.showItemInFolder(text)}>{getNameFromPath(text).name}</a> : <></>}
      ▫
      {remaining ? <label>{remaining}</label> : <></>}
      </div>
    </div>
  );
}
