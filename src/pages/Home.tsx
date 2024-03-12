import { useUser } from "../context/userContext";
import module from "../css/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Disclaimer from "../components/Disclaimer";
import Modal from "react-modal";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  // const [open, setOpen] = useState(true);

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
  };

  return (
    <div className={module.container}>
      <Modal
        isOpen={showDisclaimer}
        onRequestClose={handleDisclaimerClose}
        className={module.disclaimer}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, .5)" } }}
      >
        <Disclaimer handleDisclaimerClose={handleDisclaimerClose} />
      </Modal>

      <div className={module.heading}>
        <h1 className={module.h1}>Picme</h1>
        <p className={module.p}>Every Pick Tells a Story.</p>
      </div>

      <div className={module.options}>
        {user && <p>Welcome Back! {user.username}</p>}
        {user ? (
          <button onClick={() => navigate("/picmes")}>Continue</button>
        ) : (
          <button onClick={() => navigate("/picmes/login")}>Login</button>
        )}
        {!user && (
          <button onClick={() => navigate("/picmes")}>
            Continue without login
          </button>
        )}
        <button onClick={() => setShowDisclaimer(true)}>Disclaimer</button>
      </div>
    </div>
  );
}
