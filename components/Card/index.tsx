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
    useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { NETWORK } from "../../globals";
// import { Event } from "../../pages/events";
import { Event } from "../../common/types";
import Card from "./card";
import { tezos, wallet } from "../../common/wallet";
import { fetchFA2For } from "../../common/tzkt";

export default function CardA({
    event,
    isConnected,
}: {
    event: Event;
    isConnected: boolean;
}) {
    const toast = useToast();
    const trasferOwnership = async (eventAddress: string) => {
        const pkh = await wallet.getPKH();
        const fa2 = await fetchFA2For(eventAddress);

        const contract = await tezos.wallet.at(fa2);
        const op = await contract.methods
            .set_administrator(eventAddress)
            .send();
        toast({
            title: "Transaction Sent",
            description:
                "Transaction to make the event contract, admin of fa2 is sent.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        await op.confirmation();
        toast({
            title: "Transaction Confirmend",
            description:
                "Transaction to make the event contract, admin of fa2 is confirmed.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };
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
                        <Stack>
                            {!isConnected && (
                                <Button
                                    onClick={() => {
                                        trasferOwnership(event.address);
                                    }}
                                >
                                    Connect
                                </Button>
                            )}
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
