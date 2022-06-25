import { Box, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { fetchAllTicketsForEvent } from "../../common/tzkt";
import FullWidthCard from "../../components/Card/FullWidthCard";
import Navbar from "../../components/Navbar";

const EventPage = () => {
    const router = useRouter();
    useEffect(() => {
        async function doSomething() {
            const allTickets = await fetchAllTicketsForEvent(
                router.query.id as string
            );
            console.log(allTickets);
        }
        doSomething();
    });
    return (
        <div>
            <Navbar />
            <Image
                h={"400px"}
                w={"full"}
                src={
                    "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                }
                alt={"Author"}
                objectFit={"cover"}
            />
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
