import { useState } from "react";
import { Toast as BootstrapToast } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";

function Toast(props) {
  const { open, handleClose, response } = props;
  const position = "middle-center";
  return (
    <div
      style={{
        color: "brown",
        position: "fixed",
        // top: "100px",
        // left: "50%",
        zIndex: 1000,
        background: "#c9ccd1",
      }}
    >
      {/* <ToastContainer> */}
      <BootstrapToast show={open} onClose={handleClose} delay={2000} autohide>
        <BootstrapToast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">My Shopping Kart</strong>
          <small>1 sec ago</small>
        </BootstrapToast.Header>
        <BootstrapToast.Body>{response}</BootstrapToast.Body>
      </BootstrapToast>
      {/* </ToastContainer> */}
    </div>
  );
}

export default Toast;
