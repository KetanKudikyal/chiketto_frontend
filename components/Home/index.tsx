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
            templateColumns="repeat(2, 1fr)"
            px={{ base: 4 }}
            mx={"auto"}
            maxW="7xl"
            gap={6}
            height={"90vh"}
        >
            <GridItem w="100%" display={"flex"} alignItems="center">
                <Box>
                    <Text fontSize="6xl" fontWeight={700}>
                        Welcome to
                    </Text>
                    <Text fontSize="6xl" fontWeight={700}>
                        Chiketto
                    </Text>
                    <Text my={4}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Itaque fugit magnam laborum, sunt atque quia
                        aperiam commodi molestias expedita earum ipsum sit
                        reprehenderit delectus excepturi vero obcaecati quos
                        nihil fugiat?
                    </Text>
                    <Flex>
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
                h="full"
                display="flex"
                justifyContent={"end"}
                alignItems="end"
            >
                <Box w={"80%"} pos={"relative"} h={"80%"}>
                    <Image src={"/ticket.png"} alt="ticket" layout="fill" />
                </Box>
            </GridItem>
        </Grid>
    );
};

export default Home;
