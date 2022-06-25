import { Box, useToast, Text } from "@chakra-ui/react";
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
            <Box width={"100%"} height={480} mt={20} pos="relative">
                <Image
                    src={`https://gateway.pinata.cloud/ipfs/${router.query.image}`}
                    layout={"fill"}
                    alt="Image"
                />
            </Box>
            <Box>
                {allTickets.map((ticket, index) => (
                    <>
                        <Box
                            // w={"7xl"}
                            maxW={"3xl"}
                            mt={10}
                            mx="auto"
                            display={"flex"}
                            justifyContent="between"
                            alignItems="center"
                        >
                            <FullWidthCard ticket={ticket} />
                        </Box>
                    </>
                ))}
            </Box>
        </div>
    );
};

export default EventPage;
