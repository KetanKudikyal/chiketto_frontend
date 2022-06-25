import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Heading,
    Avatar,
    Box,
    Center,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Link as ChakraLink,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "../../common/types";
import { NETWORK } from "../../globals";
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
                <Box width={"100%"} height={300} pos="relative">
                    <Image
                        src={`https://gateway.pinata.cloud/ipfs/${event.thumbnailUri}`}
                        layout={"fill"}
                        alt="Image"
                    />
                </Box>

                <Box p={6}>
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Heading
                            fontSize={"2xl"}
                            fontWeight={500}
                            mb={4}
                            fontFamily={"body"}
                        >
                            {event.name}
                        </Heading>
                        <Text color={"gray.500"}>
                            {event.description.slice(0, 120)}...
                        </Text>
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
