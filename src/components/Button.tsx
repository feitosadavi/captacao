import React from 'react'
import { styled } from '../config/stitches'


// @ts-ignore
export type ButtonVariant = typeof ButtonStyles.defaultProps.variant

export interface ButtonProps {
  label: string
  type?: "button" | "reset" | "submit"
  variant?: ButtonVariant
  full?: boolean
  onClick?: () => {}
}

export const Button: React.FC<any> = ({ label, type = 'button', ...props }) => {
  return (
    <ButtonStyles type={type} {...props}>
      {label}
    </ButtonStyles>
  )
}

const ButtonStyles = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: '$bolder',
  height: 35,
  letterSpacing: 1.3,
  cursor: 'pointer',

  variants: {
    variant: {
      violet: {
        // backgroundColor: 'white',
        color: '$orange11',
        boxShadow: `0 2px 10px $blackA7`,
        '&:hover': { backgroundColor: '$orange12' },
      },
      green: {
        backgroundColor: '$green4',
        color: '$green11',
        '&:hover': { backgroundColor: '$green5' },
        '&:focus': { boxShadow: `0 0 0 2px $green7'}` },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});
