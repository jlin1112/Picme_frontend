import Button from "@mui/material/Button";
import module from "./css/ConfirmRegister.module.css";

export default function ConfirmRegister({
  message,
  setStep,
  avatar,
  username,
  email,
  isRegistering
}: any) {

  
  return (
    <>
      {message && (
        <p>
          <i style={{ color: "#DB5F58" }}>{message}</i>
        </p>
      )}
      <div className={module.content}>
        <div className={module.profile}>
        <h1>
        <i style={{ color: "#eb9456" }}>Confirm</i> 
      </h1>
          <div className={module.card}>
            <div className={module.avatar}>
              <img src={`/avatar/${avatar}.png`} alt='avatar' className={module.cover} />
            </div>
            <div className={module.info}>
              <h1>{username}</h1>
              <h1>{email}</h1>
            </div>
          </div>
          <div className={module.button}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#eb9456",
                transition: "0.2s",
                height: "100px",
                "&:hover": {
                  backgroundColor: "#eb9456",
                  filter: " brightness(1.05)",
                  scale: "1.02",
                },
              }}
              // type="submit"
              onClick={() => setStep(2)}
            >
              <span style={{ color: "#fafafa" }}>Back</span>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#eb9456",
                transition: "0.2s",
                height: "100px",
                "&:hover": {
                  backgroundColor: "#eb9456",
                  filter: " brightness(1.05)",
                  scale: "1.02",
                },
              }}
              type="submit"
             
            >
              <span style={{ color: "#fafafa" }}>{isRegistering? 'Registering...' : 'Submit'}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
