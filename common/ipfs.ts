import axios from "axios";

export const uploadToIPFS = async (file: File) => {
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
                pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY || "",
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

export const uploadJSONToIPFS = async (json: object) => {
    let data = JSON.stringify(json);
    const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
            headers: {
                pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY || "",
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
