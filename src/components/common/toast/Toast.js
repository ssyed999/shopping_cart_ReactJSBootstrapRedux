import { Toast as BootstrapToast } from "react-bootstrap";

function Toast(props) {
  const { open, handleClose, response } = props;
  return (
    <div
      style={{
        color: "darkviolet",
        position: "fixed",
        zIndex: 1,
        background: "darkblue",
      }}
    >
      <BootstrapToast show={open} onClose={handleClose} delay={2000} autohide>
        <BootstrapToast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">My Shopping Kart</strong>
          <small>1 sec ago</small>
        </BootstrapToast.Header>
        <BootstrapToast.Body>{response}</BootstrapToast.Body>
      </BootstrapToast>
    </div>
  );
}

export default Toast;
