import { Box, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { FACTORY_CONTRACT, TZKT_ENDPOINT } from "../../globals";
import axios from "axios";
import { bytes2Char } from "@taquito/utils";

export type Event = {
    name: string;
    description: string;
    thumbnailUri: string;
    address: string;
    admin: string;
};

export type GetOperationByContractOptions = {
    contract: string;
    entrypoint: string;
    firstlevel: number;
    lastlevel: number;
};
export type CreateEventOperationType = {
    hash: string;
    sender: string;
    value: string;
};

export const events: Event[] = [];

const fetchIpfsMetadata = async (hash: string) => {
    const { data } = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${hash}`
    );
    return data;
};

const fetchEvents = async (address: string) => {
    const { data } = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${address}/storage`
    );
    let events: Event[] = [];
    for (let eventAddress of Object.keys(data.metadatas)) {
        const hash = bytes2Char(data.metadatas[eventAddress]);
        const metadata = await fetchIpfsMetadata(hash);
        events.push({
            address: eventAddress,
            description: metadata.description,
            name: metadata.name,
            thumbnailUri: metadata.thumbnailUri,
            admin: metadata.admin,
        });
    }
    return events;
};

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
