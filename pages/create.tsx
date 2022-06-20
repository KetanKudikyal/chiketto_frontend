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
    Select,
} from "@chakra-ui/react";
import { char2Bytes } from "@taquito/utils";
import React, { useEffect, useState } from "react";
import { tezos, wallet } from "../common/wallet";
import Navbar from "../components/Navbar";
import { FACTORY_CONTRACT, FEE } from "../globals";
import { uploadJSONToIPFS, uploadToIPFS } from "../common/ipfs";
import { Event } from "../common/types";
import { fetchEvents, fetchUsersEvents } from "../common/tzkt";

const Create = () => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState<File | null>();
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    const [ticketName, setTicketName] = useState("");
    const [ticketDesc, setTicketDesc] = useState("");
    const [ticketImg, setTicketImg] = useState<File | null>();
    const [ticketPrice, setTicketPrice] = useState<number>(1);
    const [ticketQuantity, setTicketQuantity] = useState<number>(1);
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [ticketEvent, setTicketEvent] = useState<string>("");
    const toast = useToast();
    const [isEventBtnLoading, setIsEventBtnLoading] = useState<boolean>(false);

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

    const createTicket = async () => {};
    const handleCreateTicketForm = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        let imageIPFSUri: string = "";
        let imageType: string = "";
        let imageDimension: string = "1200x700";
        const pkh = await wallet.getPKH();
        setIsEventBtnLoading(true);
        e.preventDefault();

        if (!ticketEvent) {
            toast({
                title: "Error",
                description: "Please select an event",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        // Upload the image to IPFS first.
        if (ticketImg) {
            const res = await uploadToIPFS(ticketImg);
            let u = URL.createObjectURL(ticketImg);
            let img = new Image();
            img.src = u;
            imageIPFSUri = "ipfs://" + res.msg;
            imageType = ticketImg.type;
            imageDimension = `${img.width}x${img.height}`;

            toast({
                title: res.status ? "Image uploded" : "Error",
                description: res.msg,
                status: res.status ? "success" : "error",
                duration: 9000,
                isClosable: true,
            });
            if (!res.status) return;
        } else {
            toast({
                title: "No file",
                description: "No file is selected, please select a valid file.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        // Create the metadata and upload this metadata to IPFS.
        const metadata = {
            id: 0,
            name: ticketName,
            symbol: "CHIKETTO",
            description: ticketDesc,
            decimals: 0,
            isBooleanAmount: true,
            shouldPreferSymbol: false,
            creators: [pkh],
            artifactUri: imageIPFSUri,
            displayUri: imageIPFSUri,
            thumbnailUri: imageIPFSUri,
            attributes: [{ name: "price", value: ticketPrice }],
            formats: [
                {
                    uri: imageIPFSUri,
                    mimeType: imageType,
                    dimensions: {
                        value: imageDimension,
                        unit: "px",
                    },
                },
            ],
            rights: "(c) 2022 Chiketto | All rights reserved.",
        };
        const metadataRes = await uploadJSONToIPFS(metadata);
        const metadataUri = "ipfs://" + metadataRes.msg;

        toast({
            title: metadataRes.status ? "Metadata uploded" : "Error",
            description: metadataRes.msg,
            status: metadataRes.status ? "success" : "error",
            duration: 9000,
            isClosable: true,
        });
        if (!metadataRes.status) return;

        // Call the createTicket transaction
        const contract = await tezos.wallet.at(ticketEvent);
        const op = await contract.methods
            .createTicket(
                ticketQuantity,
                ticketPrice * 10 ** 6,
                char2Bytes(metadataUri)
            )
            .send();

        toast({
            title: "Transaction Sent.",
            description: `Transaction to create Event contract with hash ${op.opHash} is sent.`,
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        await op.confirmation();
        toast({
            title: "Transaction Confirmed",
            description: "Ticket created successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        setIsEventBtnLoading(false);
    };

    useEffect(() => {
        async function doSomething() {
            const pkh = await wallet.getPKH();
            const ev = await fetchUsersEvents(FACTORY_CONTRACT, pkh);
            setMyEvents(ev);
        }
        doSomething();
    }, []);

    return (
        <div>
            <Navbar />
            {/* Event Form */}
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

            {/* Ticket form */}
            <form
                onSubmit={handleCreateTicketForm}
                style={{ marginTop: "2rem" }}
            >
                <Box
                    maxW={"3xl"}
                    marginX={"auto"}
                    p={6}
                    rounded={"sm"}
                    boxShadow={"sm"}
                    border={"gray.400"}
                    borderWidth={2}
                >
                    <Heading>Create Ticket</Heading>
                    <Stack>
                        <Text>Event: </Text>
                        <Select
                            placeholder="Select Event"
                            value={ticketEvent}
                            onChange={(e) => setTicketEvent(e.target.value)}
                        >
                            {myEvents.map((event, index) => (
                                // make the first one default
                                <option key={index} value={event.address}>
                                    {event.name}
                                </option>
                            ))}
                        </Select>
                    </Stack>
                    <Stack>
                        <Text>Name: </Text>
                        <Input
                            value={ticketName}
                            onChange={(e) => setTicketName(e.target.value)}
                            placeholder="Here is a sample placeholder"
                            mt={"0"}
                            size="sm"
                            isRequired={true}
                        />
                    </Stack>
                    <Stack>
                        <Text>Description: </Text>
                        <Textarea
                            value={ticketDesc}
                            onChange={(e) => setTicketDesc(e.target.value)}
                            placeholder="Here is a sample placeholder"
                            mt={"0"}
                            size="sm"
                            isRequired={true}
                        ></Textarea>
                    </Stack>
                    <Stack>
                        <Text>Quantity: </Text>
                        <Input
                            value={ticketQuantity}
                            onChange={(e) =>
                                setTicketQuantity(parseInt(e.target.value))
                            }
                            placeholder="Amount of tickets to mint."
                            type={"number"}
                            mt={"0"}
                            size="sm"
                            isRequired={true}
                        />
                    </Stack>
                    <Stack>
                        <Text>Price (in XTZ): </Text>
                        <Input
                            value={ticketPrice}
                            onChange={(e) =>
                                setTicketPrice(parseFloat(e.target.value))
                            }
                            placeholder="Price of 1 ticket (in XTZ)"
                            type={"number"}
                            mt={"0"}
                            size="sm"
                            isRequired={true}
                        />
                    </Stack>
                    <Stack>
                        <Text>Image: </Text>
                        <Input
                            onChange={(e) =>
                                setTicketImg(
                                    e.target.files ? e.target.files[0] : null
                                )
                            }
                            accept={"image/png, image/jpg, image/jpeg"}
                            type={"file"}
                            placeholder="Image for the ticket."
                            mt={"0"}
                            size="sm"
                            isRequired={true}
                        />
                    </Stack>
                    <Stack alignItems={"start"}>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={isEventBtnLoading}
                        >
                            Create Ticket
                        </Button>
                    </Stack>
                </Box>
            </form>
        </div>
    );
};

export default Create;
