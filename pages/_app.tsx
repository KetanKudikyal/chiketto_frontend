import "../styles/globals.css";
import type { AppProps } from "next/app";

// 1. Import the extendTheme function
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../redux/store/index";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
        900: "red",
        800: "#153e75",
        700: "#2a69ac",
    },
};

const theme = extendTheme({ colors });
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    );
}

export default MyApp;
