import {
    Box,
    Heading,
    Stack,
    Input,
    Text,
    Textarea,
    Button,
    HStack,
    useToast,
    VStack,
    FormLabel,
    Image,
} from "@chakra-ui/react";
import { char2Bytes } from "@taquito/utils";
import axios from "axios";
import React, { useState } from "react";
import { tezos } from "../../../common/wallet";
import { FACTORY_CONTRACT, FEE } from "../../../globals";
import AwaitingTransactions from "../../Modal/AwaitingTransactions";
import Navbar from "../../Navbar";

const Create = () => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState<File | null>();
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const toast = useToast();

    const uploadToIPFS = async (file: File) => {
        const data = new FormData();
        data.append("file", file);
        data.append("pinataOptions", '{"cidVersion": 1}');
        data.append(
            "pinataMetadata",
            '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
        );
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data,
            {
                headers: {
                    pinata_api_key:
                        process.env.NEXT_PUBLIC_PINATA_API_KEY || "",
                    pinata_secret_api_key:
                        process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || "",
                },
            }
        );
        if (res.status === 200) {
            return { status: true, msg: res.data.IpfsHash };
        } else {
            return { status: false, msg: "Error with Pinata API." };
        }
    };

    const createEventContract = async (
        name: string,
        desc: string,
        imgUri: string
    ) => {
        try {
            const contract = await tezos.wallet.at(FACTORY_CONTRACT);
            const op = await contract.methods
                .default(
                    char2Bytes(
                        JSON.stringify({
                            name: name,
                            description: desc,
                            thumbnailUri: imgUri,
                        })
                    )
                )
                .send({ amount: FEE, mutez: true });
            toast({
                title: "Transaction Sent.",
                description: `Transaction to create Event contract with hash ${op.opHash} is sent.`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            await op.confirmation();
            return { status: true, msg: "Contracts Created." };
        } catch (_) {
            let e: Error = _ as Error;
            return { status: false, msg: e.message };
        }
    };

    const handleCreateForm = async (e: React.FormEvent<HTMLFormElement>) => {
        let ipfsUri: string = "";
        setIsBtnLoading(true);
        e.preventDefault();
        const metadata = {};
        console.log(img);
        if (img) {
            const res = await uploadToIPFS(img);
            ipfsUri = res.msg;
            toast({
                title: res.status ? "Image uploded" : "Error",
                description: res.msg,
                status: res.status ? "success" : "error",
                duration: 9000,
                isClosable: true,
            });
            if (!res.status) return;
        } else {
            console.error("No file.");
            toast({
                title: "No file",
                description: "No file is selected, please select a valid file.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        const info = await createEventContract(name, desc, ipfsUri);
        toast({
            title: info.status ? "Transaction Confirmed" : "Error",
            description: info.msg,
            status: info.status ? "success" : "error",
            duration: 9000,
            isClosable: true,
        });

        setIsBtnLoading(false);
    };

    return (
        <Box my={3}>
            <AwaitingTransactions />
            <form onSubmit={handleCreateForm}>
                <Box
                    bg="#04293A"
                    marginX={"auto"}
                    px={6}
                    py={10}
                    w={600}
                    my={10}
                    rounded={"lg"}
                    boxShadow={"sm"}
                    display="flex"
                    flexDir={"column"}
                    alignItems="center"
                >
                    <Heading mb={6} textAlign={"center"}>
                        Create Event
                    </Heading>
                    <Stack>
                        <Text>Name: </Text>
                        <Input
                            value={name}
                            width={500}
                            borderRadius="none"
                            border="none"
                            borderBottom={"2px solid"}
                            borderBottomColor="secondary.outline"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            py={3}
                            _hover={{
                                boxShadow: "none",
                                borderBottomColor: "secondary.outline",
                            }}
                            _focus={{
                                boxShadow: "none",
                                borderBottomColor: "secondary.outline",
                            }}
                            isRequired={true}
                        />
                    </Stack>
                    <Stack mt={7}>
                        <Text>Description: </Text>
                        <Textarea
                            value={desc}
                            width={500}
                            borderRadius="none"
                            border="none"
                            borderBottom={"2px solid"}
                            borderBottomColor="secondary.outline"
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Enter Name"
                            pb={3}
                            mt="0"
                            rows={1}
                            _hover={{
                                boxShadow: "none",
                                borderBottomColor: "secondary.outline",
                            }}
                            _focus={{
                                boxShadow: "none",
                                borderBottomColor: "secondary.outline",
                            }}
                            isRequired={true}
                        />
                    </Stack>
                    <Stack mt={7}>
                        <FormLabel textAlign={"start"}>Image: </FormLabel>
                        {img ? (
                            <Box
                                w={"120px"}
                                h={"100px"}
                                borderRadius="10px"
                                border="2px solid "
                                display={"flex"}
                                alignItems="center"
                                justifyContent={"center"}
                                fontWeight={700}
                                fontSize={"12px"}
                                borderColor="secondary.outline"
                                _hover={{
                                    borderColor: "secondary.outline",
                                }}
                            >
                                {img.name}
                            </Box>
                        ) : (
                            <Input
                                w={"120px"}
                                h={"100px"}
                                borderRadius="10px"
                                border="2px solid "
                                borderColor="secondary.outline"
                                _hover={{
                                    borderColor: "secondary.outline",
                                }}
                                onChange={(e) =>
                                    setImg(
                                        e.target.files
                                            ? e.target.files[0]
                                            : null
                                    )
                                }
                                accept={"image/png, image/jpg, image/jpeg"}
                                type={"file"}
                                placeholder="Here is a sample placeholder"
                                mt={"0"}
                                size="sm"
                                isRequired={true}
                            />
                        )}
                    </Stack>
                    <Stack alignItems={"end"} mt={7} w={500}>
                        <Button
                            type="submit"
                            variant={"solid"}
                            fontWeight={500}
                            isLoading={isBtnLoading}
                        >
                            Create Event
                        </Button>
                    </Stack>
                </Box>
            </form>
        </Box>
    );
};

export default Create;
