import { MichelsonMap, Signer, TezosToolkit } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";

const NODE = {
    ithacanet: "https://ithacanet.smartpy.io",
    mainnet: "https://mainnet.smartpy.io",
    jakartanet: "https://jakartanet.smartpy.io",
};

export interface TransactionType {
    to_: string;
    amount: number;
    token_id: number;
}

class Contract {
    tezos: TezosToolkit;
    node: string;
    address: string;
    constructor(address: string, signer: Signer, node: string) {
        this.node = node;
        this.address = address;
        this.tezos = new TezosToolkit(node);
        this.tezos.setProvider({ signer: signer });
    }
    async call(functionName: string, ...args: any[]) {
        try {
            const contract = await this.tezos.contract.at(this.address);
            const op = await contract.methods[functionName](...args).send();
            await op.confirmation();
            return { status: true, msg: "" };
        } catch (e) {
            return { status: false, msg: e };
        }
    }
}

class Originate {
    node: string;
    tezos: TezosToolkit;

    constructor(signer: Signer, node: string) {
        this.node = node;
        this.tezos = new TezosToolkit(node);
        this.tezos.setProvider({ signer: signer });
    }

    /**
     *
     * @param {Object} code
     * @param {Object} init
     * @returns {Object}
     */
    async deploy(code: string | object[], init: string | object) {
        try {
            const op = await this.tezos.contract.originate({
                code: code,
                init: init,
            });
            await op.contract();
            return { status: true, msg: op.contractAddress };
        } catch (e) {
            return { status: false, msg: e };
        }
    }
}

class FA2 extends Contract {
    /**
     * @param {String} address
     * @param {InMemorySigner} signer
     * @param {String} node
     */
    constructor(address: string, signer: Signer, node: string) {
        super(address, signer, node);
    }

    /**
     *
     * @param {String} owner
     * @param {String} operator
     * @param {Number} tokenId
     * @param {String} action
     * @returns {Object}
     */
    async updateOperator(
        owner: string,
        operator: string,
        tokenId: number,
        action: "add" | "remove"
    ) {
        if (!["add", "remove"].includes(action)) {
            return { status: false, msg: "INVALID_ACTION" };
        }
        return await this.call("update_operators", [
            {
                [action + "_operator"]: {
                    owner: owner,
                    operator: operator,
                    token_id: tokenId,
                },
            },
        ]);
    }
    async addOperator(owner: string, operator: string, tokenId: number) {
        return await this.updateOperator(owner, operator, tokenId, "add");
    }
    async removeOperator(owner: string, operator: string, tokenId: number) {
        return await this.updateOperator(owner, operator, tokenId, "remove");
    }

    async mint(
        admin: string,
        amount: number,
        tokenId: number,
        decimals: number,
        symbol: string,
        name: string,
        thumbnailUri: string
    ) {
        return await this.call(
            "mint",
            admin,
            amount,
            MichelsonMap.fromLiteral({
                decimals: char2Bytes(decimals.toString()),
                symbol: char2Bytes(symbol),
                name: char2Bytes(name),
                thumbnailUri: char2Bytes(thumbnailUri),
            }),
            tokenId
        );
    }

    async setAdministrator(admin: string) {
        return await this.call("set_administrator", admin);
    }

    async transferMultiple(from: string, txs: TransactionType[]) {
        return await this.call("transfer", [{ from_: from, txs: txs }]);
    }

    async transferOne(
        from: string,
        amount: number,
        to: string,
        tokenId: number
    ) {
        const tx: TransactionType = {
            amount: amount,
            to_: to,
            token_id: tokenId,
        };
        return this.transferMultiple(from, [tx]);
    }
}

class FA12 extends Contract {
    constructor(address: string, signer: Signer, node: string) {
        super(address, signer, node);
    }

    async transfer(from: string, to: string, value: number) {
        await this.call("transfer", from, to, value);
    }
    async approve(spender: string, value: number) {
        await this.call("approve", spender, value);
    }
}

export { Contract, FA2, Originate, FA12, NODE };
