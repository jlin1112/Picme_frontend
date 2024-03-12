import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import module from "./css/InfoInput.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";

export default function InfoInput({
  message,
  setMessage,
  setStep,
  setUsername,
  setEmail,
  setPassword,
}: any) {
  type DataToBeSubmitted = {
    username: string;
    email: string;
    password: string;
  };

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<DataToBeSubmitted>();

  Axios.defaults.withCredentials = true;
  async function validateInputs() {
    const validateSuccess = await trigger();
    const { username, email, password } = getValues();

    const apiUrl = process.env.REACT_APP_API_URL;

    if (validateSuccess) {
      //Axios verify if username or email already existed
      Axios.post(`${apiUrl}/picmes/verifysignup`, {
        username,
        email,
      })
        .then(function (response) {
          setUsername(username);
          setEmail(email);
          setPassword(password);
          setStep(2);
        })
        .catch(function (error) {
          if (error.response) {
            setMessage((prev: string) => error.response.data);
            return;
          } else {
            setMessage((prev: string) => "Error on verifying input");
          }
        });
      setMessage((prev: string) => "");
    }
  }

  return (
    <>
      {message && (
        <p>
          <i style={{ color: "#DB5F58" }}>{message}</i>
        </p>
      )}
      <div className={module.form}>
        <div className={module.input}>
          <TextField
            id="username"
            label="Username"
            className={module.textfield}
            InputLabelProps={{
              sx: {
                color: "#4d4d4f",
                "&.Mui-focused": { color: "#4d4d4f" },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4d4d4f", // default
                },

                "&.Mui-focused fieldset": {
                  color: "#4d4d4f",
                  border: "2px solid #4d4d4f", // focus
                },
              },
            }}
            {...register("username", { required: true, maxLength: 15 })}
          />
          <p>
            <i style={{ color: "#DB5F58" }}>{errors.username?.message}</i>
            {errors.username && errors.username.type === "required" && (
              <i style={{ color: "#DB5F58" }}>Username is required</i>
            )}
            {errors.username && errors.username.type === "maxLength" && (
              <i style={{ color: "#DB5F58" }}>Username must below 15 characters</i>
            )}
          </p>
        </div>

        <div className={module.input}>
          <TextField
            id="email"
            label="Email"
            className={module.textfield}
            InputLabelProps={{
              sx: {
                color: "#4d4d4f",
                "&.Mui-focused": { color: "#4d4d4f" },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4d4d4f", // default
                },

                "&.Mui-focused fieldset": {
                  color: "#4d4d4f",
                  border: "2px solid #4d4d4f", // focus
                },
              },
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Valid email address needed",
              },
            })}
          />

          <p>
            <i style={{ color: "#DB5F58" }}>{errors.email?.message}</i>
          </p>
        </div>
        <div className={module.input}>
          <TextField
            id="password"
            label="Password"
            className={module.textfield}
            InputLabelProps={{
              sx: {
                color: "#4d4d4f",
                "&.Mui-focused": { color: "#4d4d4f" },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4d4d4f", // default
                },

                "&.Mui-focused fieldset": {
                  color: "#4d4d4f",
                  border: "2px solid #4d4d4f", // focus
                },
              },
            }}
            {...register("password", {
              required: "Password is required",
            })}
          />
          <p>
            <i style={{ color: "#DB5F58" }}>{errors.password?.message}</i>
          </p>
        </div>
        <div className={module.text}>
          <Link to="/picmes/login" style={{textDecoration:'none'}}>
            <p>
              Already have an account? <i>Login</i>
            </p>
          </Link>
        </div>
        <div className={module.text}>
          <Link to="/picmes" style={{textDecoration:'none'}}>
            <p>
            Or go to main page
            </p>
          </Link>
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
            onClick={validateInputs}
          >
            <span style={{ color: "#fafafa" }}>Next</span>
          </Button>
        </div>
      </div>
    </>
  );
}
