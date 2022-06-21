import axios from "axios";
import { bytes2Char } from "@taquito/utils";
import { Event } from "./types";

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
