import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { NETWORK } from "../../globals";
import { Event } from "../../pages/events";
import Card from "./card";

export default function CardA({ event }: { event: Event }) {
    return (
        <Center py={6} w="full" m={6}>
            <Box
                bg="#04293A"
                w={"full"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
            >
                <Image
                    h={"220px"}
                    w={"full"}
                    src={`https://gateway.pinata.cloud/ipfs/${event.thumbnailUri}`}
                    objectFit={"cover"}
                    alt="Image"
                />
                <Box p={6}>
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Heading
                            fontSize={"2xl"}
                            fontWeight={500}
                            fontFamily={"body"}
                        >
                            {event.name}
                        </Heading>
                        <Text color={"gray.500"}>{event.description}</Text>
                    </Stack>
                    {/* <Stack direction={"row"} justify={"center"} spacing={6}>
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>{event.name}</Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Tickets left
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>{event.name}</Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Price in USD
                            </Text>
                        </Stack>
                    </Stack> */}
                    <Stack direction={"row"} justify={"space-between"}>
                        <Stack direction={"row"}>
                            <Text>Creator:</Text>

                            <ChakraLink
                                href={`https://better-call.dev/${NETWORK}/${event.admin}`}
                                isExternal
                            >
                                {event.admin.slice(0, 4) +
                                    "..." +
                                    event.admin.slice(
                                        event.admin.length - 4,
                                        event.admin.length
                                    )}
                                <ExternalLinkIcon mx="2px" />
                            </ChakraLink>
                        </Stack>
                    </Stack>
                    <Link href={`/events/${event.address}`}>
                        <Button
                            w={"full"}
                            mt={8}
                            variant="outline"
                            color={"white"}
                            rounded={"md"}
                            _hover={{
                                transform: "translateY(-2px)",
                                boxShadow: "lg",
                            }}
                        >
                            Check Event
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Center>
    );
}
