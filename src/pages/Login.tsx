import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUser } from "../context/userContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import module from "../css/Login.module.css";

const Login: React.FC = () => {
  type DataToBeSubmitted = {
    email: string;
    password: string;
    stayLoggedIn: boolean;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataToBeSubmitted>();

  const [formMessage, setFormMessage] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const apiUrl = process.env.REACT_APP_API_URL;

  Axios.defaults.withCredentials = true;
  function onSubmit(data: DataToBeSubmitted) {
    setIsLogging(true);
    const { email, password, stayLoggedIn=false } = data;
    Axios.post(`${apiUrl}picmes/login`, {
      email,
      password,
      stayLoggedIn,
    })
      .then(function (response) {
        setIsLogging(false);
        localStorage.setItem('token',response.data.token)
        setUser({
          username: response.data.username,
          id: response.data.id,
          avatar: response.data.avatar,
          isAdmin: response.data.isAdmin,
          likedPost: response.data.likedPost,
        });
        navigate("/picmes");
      })
      .catch(function (error) {
        setIsLogging(false);
        if (error.response) {
          setFormMessage(error.response.data);
        } else {
          setFormMessage("no server response");
        }
      });
  }

  return (
    <div className={module.background}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={module.box}>
          <h1 className={module.heading}>
            <i>Login</i>
          </h1>
          <div className={module.underline}></div>
          {formMessage && (
            <p>
              <i style={{ color: "#DB5F58" }}>{formMessage}</i>
            </p>
          )}
          <div className={module.form}>
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
            {/* <div className={module.checkbox}>
              <input
                type="checkbox"
                id="checkbox"
                {...register("stayLoggedIn")}
              />
              <label htmlFor="checkbox">Stay Logged In for 7 days</label>
            </div> */}
            <div className={module.text}>
              <Link to="/picmes/register" style={{ textDecoration: "none" }}>
                <p>
                  Don't have an account yet? <i>Register</i>
                </p>
              </Link>
            </div>
            <div className={module.text}>
              <Link to="/picmes" style={{ textDecoration: "none" }}>
                <p>Or go to main page</p>
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
                type="submit"
              >
                <span style={{ color: "#fafafa" }}>
                  {isLogging ? "Logging in..." : "Login"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
