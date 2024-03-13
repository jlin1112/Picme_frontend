import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import module from "./css/LoginForm.module.css";
import { useForm } from "react-hook-form";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginForm({
  handleLoginFormClose,
  setUser,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formMessage, setFormMessage] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  Axios.defaults.withCredentials = true;
  function onSubmit(data) {
    const { email, password, stayLoggedIn=false } = data;
    setIsLogging(true);
    Axios.post(`${apiUrl}/picmes/login`, {
      email,
      password,
      stayLoggedIn,
    })
      .then(function (response) {
        
        setUser({
          username: response.data.username,
          id: response.data.id,
          avatar: response.data.avatar,
          isAdmin: response.data.isAdmin,
          likedPost: response.data.likedPost,
        });
       
       
        handleLoginFormClose();
        setIsLogging(false);
        navigate(0);
      })
      .catch(function (error) {
        
        if (error.response) {
          
          setFormMessage(error.response.data);
        } else {
          setFormMessage("no server response");
        }
        setIsLogging(false);
      });
  }

  return (
    <Box className={module.box}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={module.heading}>
          <i>Login</i>
          <img src="/icons/warning-cross.png" alt="close" onClick={handleLoginFormClose} />
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
                sx: { color: "#4d4d4f", "&.Mui-focused": { color: "#4d4d4f" } },
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
              onFocus={() => setFormMessage("")}
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
                sx: { color: "#4d4d4f", "&.Mui-focused": { color: "#4d4d4f" } },
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
              {...register("password", { required: "Password is required" })}
            />
            <p>
              <i style={{ color: "#DB5F58" }}>{errors.password?.message}</i>
            </p>
            {/* <div className={module.checkbox}>
              <input
                type="checkbox"
                id="checkbox"
                {...register("stayLoggedIn")}
              />
              <label htmlFor="checkbox">Stay Logged In for 7 days</label>
            </div> */}
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
          <span>
              <Link to="/picmes/register">
                <i>No account yet? Register</i>
              </Link>
            </span>
        </div>
      </form>
    </Box>
  );
}
