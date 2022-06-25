import { Box, useToast, Text, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Ticket } from "../../common/types";
import { fetchAllTicketsForEvent, fetchEvents } from "../../common/tzkt";
import FullWidthCard from "../../components/Card/FullWidthCard";
import Navbar from "../../components/Navbar";
import { FACTORY_CONTRACT } from "../../globals";

const EventPage = () => {
    const router = useRouter();
    const toast = useToast();
    const [allTickets, setAllTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        async function doSomething() {
            if (router.query.id) {
                const all = await fetchAllTicketsForEvent(
                    router.query.id as string
                );
                setAllTickets(all);
            }
        }
        doSomething();
    }, []);

    return (
        <div>
            <Navbar />
            <Box
                display={{
                    lg: "block",
                    base: "none",
                }}
                width={"100%"}
                height={480}
                mt={20}
                pos="relative"
            >
                <Image
                    src={`https://gateway.pinata.cloud/ipfs/${router.query.image}`}
                    layout={"fill"}
                    alt="Image"
                />
            </Box>
            <Grid
                maxW={"7xl"}
                mx="auto"
                mt={20}
                templateColumns={{
                    lg: "repeat(2, 1fr)",
                    base: "repeat(1, 1fr)",
                }}
                gap={6}
            >
                {allTickets.map((ticket, index) => (
                    <>
                        {" "}
                        <GridItem key={index}>
                            <FullWidthCard ticket={ticket} />
                        </GridItem>
                    </>
                ))}
            </Grid>
            <Box></Box>
        </div>
    );
};

export default EventPage;
