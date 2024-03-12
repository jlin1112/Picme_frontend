import Button from "@mui/material/Button";
import module from "./css/Avatar.module.css";

export default function Avatar({ message, avatar, setAvatar, setStep }: any) {
  function handleClick(e: any) {
    setAvatar(Number(e.target.id));
  }

  const avatars = [];
  for (let i = 1; i < 11; i++) {
    avatars.push(
      <img src={`/avatar/${i}.png`} alt="avatar" className={module.cover} id={`${i}`} />
    );
  }

  return (
    <>
      {message && (
        <p>
          <i style={{ color: "#DB5F58" }}>{message}</i>
        </p>
      )}
      <div className={module.content}>
        <h1>
          <i style={{ color: "#eb9456" }}>Choose an avatar</i>
        </h1>
        <div className={module.form}>
          <div className={module["avatar-container"]}>
            {avatars.map((a) => {
              return (
                <div
                  className={
                    avatar === Number(a.props.id)
                      ? module["avatar-selected"]
                      : module.avatar
                  }
                  key={a.props.id}
                  onClick={handleClick}
                >
                  {a}
                </div>
              );
            })}
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
              onClick={() => setStep(1)}
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
              // type="submit"
              onClick={() => setStep(3)}
            >
              <span style={{ color: "#fafafa" }}>Next</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
