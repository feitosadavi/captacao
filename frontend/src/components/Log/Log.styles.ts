import { styled } from '../../config/stitches';

export const Container = styled('div', {
  background: '$mauve4',
  boxShadow: '$2',
  borderRadius: '$1',
  width: '510px',
  px: '$1'
})

export const LogMessageWrapper = styled("div", {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$10',
  py: '5px',
  px: '5px',
  my: '$2',
  borderRadius: '$1',
  width: '100%',
  height: '25px',
  background: '$mauve6',
})

export const LogMessage = styled('div', {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
  fontWeight: '600',
  fontFamily: 'Roboto',
  marginLeft: '10px',

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
  width: '500px',
  maxHeight: '200px',

  // px: '$3',
  // py: '$2'
})

export const ToolBar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // px: '$2',
  py: '$2',
  width: '100%',
  // height: '40px',
  // background: '$mauve3',
})