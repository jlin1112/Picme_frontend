import { useState } from "react";

import module from "./css/Messenger.module.css";

const Messenger = ({ message, status }) => {
  const [show, setShow] = useState(true);

  function handleShow() {
    setShow((prev) => false);
  }

  return (
    <>
      {status === "Success" ? (
        <div className={show ? module.msg : module.nomsg} onClick={handleShow}>
          <img src="/icons/success.png" alt="success" />
          <div>
            <h1>{status}</h1>
            <span>{message}</span>
          </div>
        </div>
      ) : (
        <div
          className={show ? module.errmsg : module.noerrmsg}
          onClick={handleShow}
        >
          <img src="/icons/error.png" alt="error" />
          <div>
            <h1>{status}</h1>
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Messenger;
