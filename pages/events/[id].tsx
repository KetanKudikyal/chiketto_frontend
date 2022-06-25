import { Box, Image, useToast, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Ticket } from "../../common/types";
import { fetchAllTicketsForEvent } from "../../common/tzkt";
import { tezos } from "../../common/wallet";
import FullWidthCard from "../../components/Card/FullWidthCard";
import Navbar from "../../components/Navbar";

const EventPage = () => {
    const router = useRouter();
    const toast = useToast();
    const [allTickets, setAllTickets] = useState<Ticket[]>([]);

    const buyTicket = async (ticketId: number, ticketPrice: number) => {
        // Buying ticket.
        const contract = await tezos.wallet.at(router.query.id as string);
        const op = await contract.methods
            .purchaseTicket(ticketId)
            .send({ amount: ticketPrice, mutez: true });
        toast({
            title: "Transaction Sent.",
            description: "Your transaction to purchase ticket is sent.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        await op.confirmation();
        toast({
            title: "Transaction Confirmed.",
            description: "Your transaction to purchase ticket is confirmed.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    useEffect(() => {
        async function doSomething() {
            const all = await fetchAllTicketsForEvent(
                router.query.id as string
            );
            console.log(all);
            setAllTickets(all);
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
            <Box>
                {allTickets.map((ticket) => (
                    <Text>{JSON.stringify(ticket)}</Text>
                ))}
            </Box>
        </div>
    );
};

export default EventPage;
