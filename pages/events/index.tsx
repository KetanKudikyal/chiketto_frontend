import { Box, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { FACTORY_CONTRACT, TZKT_ENDPOINT } from "../../globals";
import axios from "axios";
import { bytes2Char } from "@taquito/utils";
import { fetchEvents, fetchIpfsMetadata } from "../../common/tzkt";
import { Event } from "../../common/types";

export const events: Event[] = [];

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function doSomething() {
            // Fetch all the create events operations
            const ev = await fetchEvents(FACTORY_CONTRACT);
            setEvents(ev);
        }
        doSomething();
    }, []);
    return (
        <div>
            <Navbar />
            <Box
                maxW={"3xls"}
                mt={10}
                mx="auto"
                display={"flex"}
                justifyContent="between"
                alignItems="center"
            >
                {events.map((item, index) => (
                    <Card key={index} event={item} />
                ))}
            </Box>
        </div>
    );
};

export default Events;
