// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { components } from '../components'

// 2. Add your color mode config
const config: ThemeConfig = {
     initialColorMode: 'dark',
     useSystemColorMode: true,
}

const colors = {
     primary: {
          main: "#041C32"
     },
     secondary: {
          main: "#ECB365",
          outline: "#064663"
     }
}

// 3. extend the theme
const theme = extendTheme({
     colors, config, components, styles: {
          global: () => ({
               body: {
                    bg: "primary.main",
                    color: "#fff"
               },
          })
     },
})

export default theme