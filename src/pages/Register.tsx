import Axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { useUser } from "../context/userContext";
import Box from "@mui/material/Box";
import module from "../css/Register.module.css";
import InfoInput from "../components/InfoInput";
import Avatar from "../components/Avatar";
import ConfirmRegister from "../components/ConfirmRegister";
import PleaseVerify from "../components/PleaseVerify";

const Register: React.FC = () => {
  type DataToBeSubmitted = {
    username: string;
    email: string;
    password: string;
  };

  const { handleSubmit } = useForm<DataToBeSubmitted>();

  // const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");

  // const { setUser } = useUser();

  const [step, setStep] = useState<number>(1);

  const [avatar, setAvatar] = useState<number>(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  function conditionalRender(step: number) {
    switch (step) {
      case 1:
        return (
          <InfoInput
            message={message}
            setMessage={setMessage}
            setStep={setStep}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        );
      case 2:
        return (
          <Avatar
            message={message}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setStep={setStep}
            avatar={avatar}
            setAvatar={setAvatar}
          />
        );
      case 3:
        return (
          <ConfirmRegister
            message={message}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            avatar={avatar}
            setStep={setStep}
            username={username}
            email={email}
            isRegistering={isRegistering}
          />
        )
      case 4:
        return(
          <PleaseVerify />
        );
    }
  }

  function onSubmit(data: DataToBeSubmitted) {
    setIsRegistering(true);
    Axios.post(`${apiUrl}/picmes/register`, {
      username,
      email,
      password,
      avatar,
    })
      .then(function (response) {
        setIsRegistering(false);
        // setUser({
        //   username: response.data.newUser.username,
        //   id: response.data.newUser.id,
        //   avatar: response.data.newUser.avatar,
        //   isAdmin: response.data.newUser.isAdmin,
        // });

        // setTimeout(() => navigate("/picmes"), 1000);
       
        setStep(4)
      })
      .catch(function (error) {
        setIsRegistering(false);
        if (error.response) {
          setMessage((prev) => error.response.data);
        } else if (error) {
          setMessage("Register failed, please try again later");
        }
      });
  }

  return (
    <div className={module.background}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={step === 1 ? module.box : module.box2}>
          <h1 className={module.heading}>
            <i>Create an account</i> <i>{step}/4</i>
          </h1>
          <div className={module.underline}></div>
          {conditionalRender(step)}
        </Box>
      </form>
    </div>
  );
};

export default Register;
