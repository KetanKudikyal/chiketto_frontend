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
} from "@chakra-ui/react";
import { char2Bytes } from "@taquito/utils";
import axios from "axios";
import React, { useState } from "react";
import { tezos, wallet } from "../common/wallet";
import Navbar from "../components/Navbar";
import { FACTORY_CONTRACT, FEE } from "../globals";

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

    const uploadJSONToIPFS = async (json: object) => {
        let data = JSON.stringify(json);
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            data,
            {
                headers: {
                    pinata_api_key:
                        process.env.NEXT_PUBLIC_PINATA_API_KEY || "",
                    pinata_secret_api_key:
                        process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || "",
                    ["Content-Type"]: "application/json",
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
            // Upload the metadata to IPFS first.
            const admin = await wallet.getPKH();
            const res = await uploadJSONToIPFS({
                name: name,
                description: desc,
                thumbnailUri: imgUri,
                admin: admin,
            });
            toast({
                title: res.status ? "Metadata Uploaded" : "Error",
                description: res.msg,
                status: res.status ? "success" : "error",
                duration: 9000,
                isClosable: true,
            });
            if (!res.status)
                return {
                    status: false,
                    msg: "Error while uploading the metadata to IPFS",
                };
            const contract = await tezos.wallet.at(FACTORY_CONTRACT);
            const op = await contract.methods
                .default(char2Bytes(res.msg))
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
        <div>
            <Navbar />
            <form onSubmit={handleCreateForm}>
                <Box
                    maxW={"3xl"}
                    marginX={"auto"}
                    p={6}
                    rounded={"sm"}
                    boxShadow={"sm"}
                    border={"gray.400"}
                    borderWidth={2}
                >
                    <Heading>Create Event</Heading>
                    <Stack>
                        <Text>Name: </Text>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Here is a sample placeholder"
                            mt={"0"}
                            size="sm"
                            isRequired={true}
                        />
                    </Stack>
                    <Stack>
                        <Text>Description: </Text>
                        <Textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Here is a sample placeholder"
                            mt={"0"}
                            size="sm"
                            isRequired={true}
                        ></Textarea>
                    </Stack>
                    <Stack>
                        <Text>Image: </Text>
                        <Input
                            onChange={(e) =>
                                setImg(
                                    e.target.files ? e.target.files[0] : null
                                )
                            }
                            accept={"image/png, image/jpg, image/jpeg"}
                            type={"file"}
                            placeholder="Here is a sample placeholder"
                            mt={"0"}
                            size="sm"
                            isRequired={true}
                        />
                    </Stack>
                    <Stack alignItems={"start"}>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={isBtnLoading}
                        >
                            Create Event
                        </Button>
                    </Stack>
                </Box>
            </form>
        </div>
    );
};

export default Create;
