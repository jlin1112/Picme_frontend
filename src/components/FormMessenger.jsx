import module from "./css/FormMessenger.module.css";

const FormMessenger = ({ message, status, showMessage, setShowMessage }) => {
  function handleShow() {
    setShowMessage((prev) => false);
  }

  return (
    <>
      {status === "Success" ? (
        <div
          className={showMessage ? module.msg : module.nomsg}
          onClick={handleShow}
        >
          <img src="/icons/success.png" alt="success" />
          <div>
            <h1>{status}</h1>
            <span>{message}</span>
          </div>
        </div>
      ) : (
        <div
          className={showMessage ? module.errmsg : module.noerrmsg}
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

export default FormMessenger;
