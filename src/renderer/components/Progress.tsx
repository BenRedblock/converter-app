import { LinearProgress } from '@mui/material';

interface Props {
  percent: number;
  remaining: string | undefined;
}

export default function Progress({ percent, remaining }: Props) {
  return (
    <div style={{ minWidth: '100%' }} className="background">
      <LinearProgress variant="determinate" value={percent} />
      {remaining ? <div className="center" style={{placeItems: "end", marginTop: "10px"}}>{remaining}</div> : <></>}
    </div>
  );
}
