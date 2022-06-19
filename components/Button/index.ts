import type { ComponentStyleConfig } from '@chakra-ui/theme'

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const Button: ComponentStyleConfig = {
     // The styles all button have in common
     baseStyle: {
          fontWeight: 'bold',
          borderRadius: 'base', // <-- border radius is same for all variants and sizes
     },
     // Two sizes: sm and md
     sizes: {
          sm: {
               fontSize: 'sm',
               px: 4, // <-- px is short for paddingLeft and paddingRight
               py: 3, // <-- py is short for paddingTop and paddingBottom
          },
          md: {
               fontSize: 'md',
               px: 6, // <-- these values are tokens from the design system
               py: 4, // <-- these values are tokens from the design system
          },
     },
     // Two variants: outline and solid
     variants: {
          solid: {
               bg: '#ECB365',
               border: "none",
               _hover: {
                    bg: '#ECB365'
               },
               _pressed: {
                    bg: '#ECB365'
               },
               _focus: {
                    bg: '#ECB365'
               }
          },
          outline: {
               bg: 'none',
               border: "2px solid",
               borderColor: "#ECB365",
               _hover: {
                    bg: 'none',
                    borderColor: "#ECB365",
               },
               _pressed: {
                    bg: '#ECB365'
               },
               _focus: {
                    bg: 'none'
               }
          },
     },
     // The default size and variant values
     defaultProps: {
          size: 'md',
          variant: 'outline',
     },
}