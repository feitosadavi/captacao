import { styled } from '../../config/stitches';

export const Container = styled('div', {
  background: '$mauve4',
  boxShadow: '$2',
  borderRadius: '$1',
})

export const LogMessage = styled('span', {
  display: 'flex',
  alignItems: 'center',
  gap: '$10',
  py: '5px',
  px: '5px',
  my: '$2',
  background: '$mauve6',
  borderRadius: '$1',
  height: '20px',
  fontWeight: '600',
  fontFamily: 'Roboto',

  variants: {
    variant: {
      info: { color: '$blue9' },
      success: { color: '$green9' },
      warning: { color: 'orange' },
      error: { color: '$red9' },
    }
  }
})

export const Wrapper = styled('div', {
  overflowY: 'scroll',
  maxHeight: '400px',

  px: '$3',
  py: '$2'
})

export const ToolBar = styled('div', {
  display: 'flex',
  alignItems: 'center',

  px: '$2',
  // width: '100%',
  // height: '40px',
  // background: '$mauve3',
})