import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, mauve, green } from '@radix-ui/colors';
import { Flex } from './Flex';
import { Button } from './Button';

interface ModalProps {
  buttonName: string
  title: string
  description: string
  closeBtnText: string
  children: JSX.Element
  onSubmit: () => void
}

export const Modal: React.FC<ModalProps> = ({ title, description, children, closeBtnText, onSubmit }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button label={title} />
    </Dialog.Trigger>
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>

        {children}

        <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <Button variant="green" label={closeBtnText} onClick={onSubmit} />
          </Dialog.Close>
        </Flex>

        <Dialog.Close asChild>
          <IconButton aria-label="Close">
            X
          </IconButton>
        </Dialog.Close>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$mauve3',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
});

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: 'white',
  fontSize: 17,
});

const DialogDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  color: '$orange10',
  fontSize: 15,
  lineHeight: 1.5,
});

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: violet.violet11,
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: 'white' },
  '&:focus': { boxShadow: `0 0 0 2px white` },
});
