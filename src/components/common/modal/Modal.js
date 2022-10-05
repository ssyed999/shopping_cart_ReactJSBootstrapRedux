import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal as BootstrapModal } from "react-bootstrap";
import { useAxios } from "../../../Hooks";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../common/toast/Toast";

const Modal = (props) => {
  const { response: thankYouResponse } = useAxios({
    url: "/posts",
  });
  const { displayModal, closeModal, header, totalItems, children, totalPrice } =
    props;
  const [openMessage, setOpenMessage] = useState(false);
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    setOpenMessage(true);
    // navigate("/products");
    // closeModal();
  };
  const handleClose = () => {
    setOpenMessage(false);
  };
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
        <Toast
          open={openMessage}
          handleClose={handleClose}
          response={thankYouResponse?.thankYouResponse}
        />

        <Button variant="primary" onClick={closeModal}>
          Continue Shopping
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
export default Modal;
