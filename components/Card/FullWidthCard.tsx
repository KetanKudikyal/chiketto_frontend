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
    useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Ticket } from "../../common/types";
import { fetchIpfsMetadata } from "../../common/tzkt";
import { tezos } from "../../common/wallet";

export default function FullWidthCard({ ticket }: { ticket: Ticket }) {
    const router = useRouter();
    const toast = useToast();

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
    return (
        <Center py={6} w={"100%"} zIndex={30} pos="relative">
            <Box
                w={"full"}
                boxShadow={"2xl"}
                rounded={"lg"}
                bg="#04293A"
                overflow={"hidden"}
            >
                <Box
                    w="full"
                    style={{
                        border: "4px solid #181818",
                    }}
                    height={"320px"}
                    pos="relative"
                >
                    <Image src={ticket.artifactUri} alt="NFTIM" layout="fill" />
                </Box>

                <Box p={6} zIndex={50}>
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Heading
                            fontSize={"2xl"}
                            fontWeight={500}
                            fontFamily={"body"}
                        >
                            {ticket.name}
                        </Heading>
                        <Text color={"gray.500"}>{ticket.description}</Text>
                    </Stack>
                    <Stack
                        direction={"row"}
                        justify={"space-around"}
                        spacing={6}
                    >
                        <Stack
                            spacing={0}
                            direction={"row"}
                            justify={"space-between"}
                            display={"flex"}
                        >
                            <Box display={"flex"} alignItems={"center"}>
                                <Text fontWeight={600} mr={2}>
                                    Price:
                                </Text>
                                <Text fontSize={"sm"} color={"gray.500"}>
                                    {ticket.price / 10 ** 6} ꜩ
                                </Text>
                            </Box>
                        </Stack>
                        <Stack>
                            <Box display={"flex"} alignItems={"center"}>
                                <Text fontWeight={600} mr={2}>
                                    <strong>Sold:</strong>
                                </Text>
                                <Text fontSize={"sm"} color={"gray.500"}>
                                    {ticket.sold}/{ticket.total}
                                </Text>
                            </Box>
                        </Stack>
                    </Stack>
                    <Button
                        w={"full"}
                        variant="solid"
                        mt={8}
                        color={"white"}
                        rounded={"md"}
                        onClick={() => buyTicket(ticket.id, ticket.price)}
                        _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                        }}
                    >
                        Buy
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}
