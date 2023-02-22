import { styled } from '../config/stitches';

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$5',
  width: '100%',
  marginRight: '10px'
})

export const ControlPanel = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  gap: '$4'
})

export const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
});

export const Label = styled('label', {
  fontSize: 15,
  color: 'white',
  width: 90,
  textAlign: 'right',
});

export const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: '$mauve11',
  boxShadow: `0 0 0 1px white`,
  height: 35,

  '&:focus': { boxShadow: `0 0 0 2px white` },
});
