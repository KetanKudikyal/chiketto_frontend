import {
    Button,
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

const AwaitingTransactions = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>
                        Awaiting Transaction
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>
                    <ModalFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="solid">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AwaitingTransactions;
