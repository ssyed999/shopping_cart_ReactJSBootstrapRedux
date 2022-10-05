import React from "react";
import Button from "react-bootstrap/Button";
import { Modal as BootstrapModal } from "react-bootstrap";

const Modal = (props) => {
  const {
    displayModal,
    closeModal,
    header,
    totalItems,
    children,
    totalPrice,
    handleCheckoutClick,
  } = props;

  return (
    <BootstrapModal show={displayModal} onHide={closeModal} backdrop="static">
      <BootstrapModal.Header
        closeButton
        style={{ background: "lightseagreen" }}
      >
        <BootstrapModal.Title>{header}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        {totalItems > 0 && <span> ( {totalItems} items )</span>}
        <p onClick={(e) => e.stopPropagation()}> </p>
        {children}
      </BootstrapModal.Body>

      <BootstrapModal.Footer>
        <Button
          variant="secondary"
          className={totalPrice > 0 ? "title" : "start title"}
          onClick={handleCheckoutClick}
        >
          {totalPrice > 0 ? (
            <>
              <span>Proceed to CheckOut</span>
              <span>
                Rs.{totalPrice}
                <span className="arrow">{">"}</span>
              </span>
            </>
          ) : (
            <span>Start Shopping</span>
          )}
        </Button>

        <Button variant="primary" onClick={closeModal}>
          Continue Shopping
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
export default Modal;
