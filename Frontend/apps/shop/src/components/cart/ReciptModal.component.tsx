import { OrderResponse } from '@b2b-app-mfe/services';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import Receipt from './ReceiptContent.component';

export type OrderSummaryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderResponse;
};

export function OrderSummaryModal({
  isOpen,
  onClose,
  orderData,
}: OrderSummaryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Summary</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Receipt orderDetails={orderData} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
