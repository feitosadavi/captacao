import * as React from 'react';
import * as Progress from '@radix-ui/react-progress'

import { styled } from '../config/stitches';
import { blackA } from '@radix-ui/colors';

interface IProgressBarProps {
  total: number
  progress: number
  icon: string
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ total, progress, icon }) => {

  // React.useEffect(() => {
  //   const timer = setTimeout(() => setProgress(66), 500);
  //   return () => clearTimeout(timer);
  // }, []);

  console.log(((progress * 100) / total) - 100);

  return (
    <Wrapper>
      <img src={`/${icon}-logo.png`} width='20' height='20' alt={`${icon} logo`} />
      <ProgressRoot value={total}>
        <ProgressIndicator style={{ transform: `translateX(-${(100 - (progress * 100) / total)}%)` }} />
      </ProgressRoot>
      <span>
        {progress}/{total}
      </span>
    </Wrapper>

  );
}

const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '$2'
})

const ProgressRoot = styled(Progress.Root, {
  position: 'relative',
  overflow: 'hidden',
  background: blackA.blackA9,
  borderRadius: '99999px',
  width: 190,
  height: 13,

  // Fix overflow clipping in Safari
  // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
  transform: 'translateZ(0)',
});

const ProgressIndicator = styled(Progress.Indicator, {
  backgroundColor: 'white',
  width: '100%',
  height: '100%',
  transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
});

