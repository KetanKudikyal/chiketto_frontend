import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

export type Event = {
    id: number;
    name: string;
    price: number;
    ticketsLeft: number;
};
export const events: Event[] = [
    {
        id: 1,
        name: "First",
        price: 100,
        ticketsLeft: 500,
    },
    {
        id: 1,
        name: "First",
        price: 100,
        ticketsLeft: 500,
    },
    {
        id: 1,
        name: "First",
        price: 100,
        ticketsLeft: 500,
    },
];
const Events = () => {
    return (
        <div>
            <Navbar />
            <Box
                w={"7xl"}
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
