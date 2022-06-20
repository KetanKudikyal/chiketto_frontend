import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../redux/store/index";
import theme from "../styles/theme";
import Seo from "../components/Seo";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <Seo />
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    );
}

export default MyApp;
