import { Box, ComponentStyleConfig, useStyleConfig } from "@chakra-ui/react";
import { ComponentProps } from "react";

export const CardStyle: ComponentStyleConfig = {
    // The styles all Cards have in common
    baseStyle: {
        display: "flex",
        bg: "red",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "16px",
        mr: "4",
        p: "5",
        minWidth: "320px",
        boxShadow:
            "0px 6px 6px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4)",
    },
};

const Card = (props: ComponentProps<typeof Box>) => {
    const { variant, ...rest } = props;
    const styles = useStyleConfig("CardStyle", { CardStyle });

    return <Box __css={styles} {...rest} {...props}></Box>;
};

export default Card;
