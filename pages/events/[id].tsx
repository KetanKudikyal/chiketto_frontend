import { Box } from "@chakra-ui/react";
import React from "react";
import FullWidthCard from "../../components/Card/FullWidthCard";
import Navbar from "../../components/Navbar";

const EventPage = () => {
    return (
        <div>
            <Navbar />
            <Box
                // w={"7xl"}
                maxW={"3xl"}
                mt={10}
                mx="auto"
                display={"flex"}
                justifyContent="between"
                alignItems="center"
            >
                <FullWidthCard />
            </Box>
        </div>
    );
};

export default EventPage;
