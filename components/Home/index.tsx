import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Home = () => {
    const router = useRouter();
    return (
        <Grid
            templateColumns={{ lg: "repeat(2, 1fr)", base: "repeat(1, 1fr)" }}
            px={{ base: 4 }}
            mx={"auto"}
            maxW="7xl"
            mt={{ lg: 10, base: 20 }}
            gap={6}
            height={{ lg: "90vh", base: "fit" }}
        >
            <GridItem w="100%" display={"flex"} alignItems="center">
                <Box>
                    <Text
                        fontSize="6xl"
                        textAlign={{ lg: "left", base: "center" }}
                        fontWeight={700}
                    >
                        Welcome to
                    </Text>
                    <Text
                        fontSize="6xl"
                        textAlign={{ lg: "left", base: "center" }}
                        fontWeight={700}
                    >
                        Chiketto
                    </Text>
                    <Text my={4} textAlign={{ lg: "left", base: "center" }}>
                        Chiketto is an open-source platform for issuing tickets
                        on the Tezos blockchain as tokens, and offering friendly
                        user flows for gaining admittance to events using these
                        NFT tickets (and to control admittance at the gate).
                    </Text>
                    <Flex
                        justifyContent={{
                            base: "center",
                            lg: "start",
                        }}
                    >
                        <Button
                            variant="solid"
                            mt={6}
                            onClick={() => router.push("/events")}
                        >
                            Checkout events
                        </Button>
                        <Button
                            ml={3}
                            variant="outline"
                            mt={6}
                            onClick={() => router.push("/create")}
                        >
                            Create event
                        </Button>
                    </Flex>
                </Box>
            </GridItem>
            <GridItem
                w="full"
                h="500px"
                display="flex"
                justifyContent={"end"}
                my={20}
                alignItems="end"
            >
                <Box
                    w={{ base: "100%", lg: "80%" }}
                    pos={"relative"}
                    h={{ base: "100%", lg: "80%" }}
                >
                    <Image src={"/ticket.png"} alt="ticket" layout="fill" />
                </Box>
            </GridItem>
        </Grid>
    );
};

export default Home;
