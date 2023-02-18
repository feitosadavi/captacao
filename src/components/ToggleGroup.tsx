import React from 'react';
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import { styled } from '@stitches/react';
import { violet, blackA, mauve } from '@radix-ui/colors';

type Item = {
  value: string
  label: string
}

interface ToogleGroupProps {
  items: string[]
  selected: string[]
  onChange: (value: any[]) => void
}

export const ToggleGroup: React.FC<ToogleGroupProps> = ({ items, selected, onChange }) => (
  <ToggleGroupRoot
    type='multiple'
    defaultValue={selected}
    aria-label="Text"
    onValueChange={onChange}
  >
    {
      items.map(item => (
        <ToggleGroupItem key={item} value={item} >
          <img src={`/${item}-logo.png`} width='20' alt={`${item} logo`} />
        </ToggleGroupItem>
      ))
    }
  </ToggleGroupRoot>
);

const ToggleGroupRoot = styled(RadixToggleGroup.Root, {
  display: 'inline-flex',
  backgroundColor: mauve.mauve6,
  borderRadius: 4,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const ToggleGroupItem = styled(RadixToggleGroup.Item, {
  all: 'unset',
  backgroundColor: 'white',
  color: mauve.mauve11,
  height: 35,
  minWidth: 35,
  padding: '3px',
  display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 1,
  '&:first-child': { marginLeft: 0, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
  '&:last-child': { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  '&:hover': { backgroundColor: violet.violet3 },
  '&[data-state=on]': { backgroundColor: violet.violet5, color: violet.violet11 },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
});