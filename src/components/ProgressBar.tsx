import * as React from 'react';
// import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { ProgressMessageType } from '../../backend/bots/olx/main';
// import Image from 'next/image';



// const LinearProgressWithLabel: React.FC<IProgressBarProps> = ({ icon, progress: { current, total } }) => {
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <Image src={`/${icon}-logo.png`} width='25' height='13' alt={`${icon} logo`} />

//       <Box sx={{ width: '100%', mx: 1 }}>
//         <LinearProgress value={(current / total) * 100} variant="determinate" />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" color="text.secondary">
//           {`${current}/${total}`}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

interface IProgressBarProps {
  icon: string
  progress: any
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ progress, icon }) => {

  // React.useEffect(() => {
  //   setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  // }, []);

  return (
    <div>progress bar</div>
    // <Box sx={{ width: '100%' }}>
    //   <LinearProgressWithLabel icon={icon} progress={progress} />
    // </Box>
  );
}