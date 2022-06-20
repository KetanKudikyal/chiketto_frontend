import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { disconnectWallet } from "../../redux/slices/wallet";

const WalletModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { walletAddress } = useAppSelector((state) => state.walletAddress);
    const dispatch = useAppDispatch();
    const logout = () => {
        dispatch(disconnectWallet());
        onClose();
    };
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>Wallet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            bg="secondary.outline"
                            variant="filled"
                            placeholder="Filled"
                            textAlign="center"
                            pointerEvents={"none"}
                            _hover={{
                                bg: "secondary.outline",
                            }}
                            value={walletAddress}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={logout}>
                            Logout
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default WalletModal;
