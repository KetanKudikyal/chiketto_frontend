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
} from "@chakra-ui/react";

export default function FullWidthCard() {
    return (
        <Center py={6} w={"full"}>
            <Box
                w={"full"}
                boxShadow={"2xl"}
                rounded={"md"}
                bg="#04293A"
                overflow={"hidden"}
            >
                <Image
                    h={"400px"}
                    w={"full"}
                    src={
                        "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    }
                    alt={"Author"}
                    objectFit={"cover"}
                />

                <Box p={6}>
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Heading
                            fontSize={"2xl"}
                            fontWeight={500}
                            fontFamily={"body"}
                        >
                            First{" "}
                        </Heading>
                        <Text color={"gray.500"}>description</Text>
                    </Stack>
                    <Stack direction={"row"} justify={"center"} spacing={6}>
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>23k</Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                TicketsLeft
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>23k</Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Price
                            </Text>
                        </Stack>
                    </Stack>
                    <Button
                        w={"full"}
                        mt={8}
                        bg={useColorModeValue("#151f21", "gray.900")}
                        color={"white"}
                        rounded={"md"}
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
