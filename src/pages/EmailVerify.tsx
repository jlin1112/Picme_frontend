import { useEffect, useState } from "react";
import module from "../css/EmailVerify.module.css";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Axios from "axios";


export default function EmailVerify() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const emailToken = searchParams.get("emailToken");

  const apiUrl = process.env.REACT_APP_API_URL;

  let status =''
  if(success){
    status = 'Verification Successful'
  } else if(failed){
    status='Verification Failed'
  } else{
    status='Verifying'
  }

  useEffect(() => {
    setIsLoading(true)
    Axios.post(`${apiUrl}/picmes/verifyEmail`, { emailToken })
      .then((response) => {
        setIsLoading(false)
        setSuccess(true)
        setTimeout(()=> {
            navigate("/picmes/login")
        }, 3000)
      })
      .catch((error) => {
        setIsLoading(false)
        setFailed(true)
        error.response? setErrorMessage(error.response.data) : setErrorMessage('No Server Response, please try again later') 
      });
      
  }, [emailToken,apiUrl]);

  return (
   <div className={module.container}>
    <div className={module.verify}>
        <h1>
            {status}
            </h1>
        {isLoading && <span className={module.loader}></span>}
        {success && <img src="/icons/success.png" alt="success icon" /> }
        {errorMessage && <img src="/icons/cross.png" alt="error icon" /> }
        {success && <Link to="/picmes/login">Redirecting to login in 3 seconds, or click this link</Link> }
        {errorMessage && <p>{errorMessage}</p>     }
        {errorMessage && <Link to="/picmes">Go to Main Page without Login</Link> }
    </div>
   </div>
  )
 
}
