import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { FACTORY_CONTRACT, TZKT_ENDPOINT } from "../../globals";
import axios from "axios";
import { bytes2Char } from "@taquito/utils";
import { fetchEvents, fetchIpfsMetadata, isConnected } from "../../common/tzkt";
import { Event } from "../../common/types";

export const events: Event[] = [];

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [connectedMap, setConnectedMap] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        async function doSomething() {
            // Fetch all the create events operations
            const ev = await fetchEvents(FACTORY_CONTRACT);
            const evMap: { [key: string]: boolean } = {};
            for (let e of ev) {
                const isC = await isConnected(e.address);
                evMap[e.address] = isC;
            }
            setEvents(ev);
            setConnectedMap(evMap);
        }
        doSomething();
    }, []);
    return (
        <div>
            <Navbar />

            <Grid
                maxW={"7xl"}
                mx="auto"
                mt={20}
                templateColumns="repeat(3, 1fr)"
                gap={6}
            >
                {events.map((item, index) => (
                    <GridItem key={index}>
                        <Card
                            key={index}
                            event={item}
                            isConnected={connectedMap[item.address]}
                        />
                    </GridItem>
                ))}
            </Grid>
        </div>
    );
};

export default Events;
