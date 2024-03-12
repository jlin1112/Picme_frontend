import { Link } from "react-router-dom";
import module from "./css/PleaseVerify.module.css";


export default function PleaseVerify() {
    return (
        <>
          <div className={module.content}>
            <div className={module.profile}>
            <p><b>Please check your email for verification</b></p>
            <p><Link to="/picmes/login">Already verified? Login here.</Link> </p>
           
           
            </div>
          </div>
        </>
      );
}