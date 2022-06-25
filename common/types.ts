export type Event = {
    name: string;
    description: string;
    thumbnailUri: string;
    address: string;
    admin: string;
};

export type GetOperationByContractOptions = {
    contract: string;
    entrypoint: string;
    firstlevel: number;
    lastlevel: number;
};
export type CreateEventOperationType = {
    hash: string;
    sender: string;
    value: string;
};

export type Ticket = {
    id: number;
    name: string;
    description: string;
    artifactUri: string;
    price: number;
    total: number;
    sold: number;
};
