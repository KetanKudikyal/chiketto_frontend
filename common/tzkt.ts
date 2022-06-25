import axios from "axios";
import { bytes2Char } from "@taquito/utils";
import { Event, Ticket } from "./types";

export const fetchIpfsMetadata = async (hash: string) => {
    const { data } = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${hash}`
    );
    return data;
};

export const fetchEvents = async (address: string) => {
    const { data } = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${address}/storage`
    );
    let events: Event[] = [];
    for (let eventAddress of Object.keys(data.metadatas)) {
        const hash = bytes2Char(data.metadatas[eventAddress]);
        const metadata = await fetchIpfsMetadata(hash);
        events.push({
            address: eventAddress,
            description: metadata.description,
            name: metadata.name,
            thumbnailUri: metadata.thumbnailUri,
            admin: metadata.admin,
        });
    }
    return events;
};

export const fetchUsersEvents = async (
    contractAddress: string,
    userAddress: string
): Promise<Event[]> => {
    const { data } = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${contractAddress}/storage`
    );
    let filteredContractAddresses: string[] = [];
    if (!Object.keys(data.userEvents).includes(userAddress)) {
        filteredContractAddresses = [];
    }
    filteredContractAddresses = data.userEvents[userAddress];
    if (!filteredContractAddresses) return [];

    const events = await fetchEvents(contractAddress);
    events.filter((e) => filteredContractAddresses.includes(e.address));
    return events;
};

export const isConnected = async (eventAddress: string): Promise<boolean> => {
    const eventStorage = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${eventAddress}/storage`
    );
    const fa2Storage = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${eventStorage.data.fa2}/storage`
    );
    if (fa2Storage.data.administrator === eventAddress) {
        return true;
    } else {
        return false;
    }
};

export const fetchFA2For = async (eventAddress: string): Promise<string> => {
    const { data } = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${eventAddress}/storage`
    );
    return data.fa2;
};

export const fetchAllTicketsForEvent = async (eventAddress: string) => {
    let tickets: Ticket[] = [];
    if (!eventAddress) return tickets;
    const eventStorage = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${eventAddress}/storage`
    );
    let priceMap = eventStorage.data.tickets;
    const fa2Storage = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${eventStorage.data.fa2}/storage`
    );
    const allTickets = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/bigmaps/${fa2Storage.data.token_metadata}/keys`
    );
    await Promise.all(
        allTickets.data.map(async (ticket: any) => {
            const metadataObject = await axios.get(
                (bytes2Char(ticket.value.token_info[""]) as string).replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                )
            );
            console.log(
                "url",
                (ticket.value.token_info[""] as string).replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                )
            );
            tickets.push({
                id: parseInt(ticket.value.token_id),
                name: metadataObject.data.name,
                description: metadataObject.data.description,
                artifactUri: metadataObject.data.artifactUri.replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                ),
                price: parseInt(priceMap[ticket.value.token_id]),
            });
        })
    );
    return tickets;
};
