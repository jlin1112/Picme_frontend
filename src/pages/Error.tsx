import { Link, useLocation } from "react-router-dom";
import UserBanner from "../components/UserBanner";
import module from "../css/Error.module.css";

export default function Error() {
  const { state } = useLocation();
  const { message } = state;

  return (
    <>
      <div className={module.body}>
        <div className={module.nav}></div>

        <div className={module.main}>
          <UserBanner />

          <h1>Error</h1>
          <h2>{message}</h2>
          <Link to="/picmes"><h2>Return to Main Page</h2></Link> 
        </div>
      </div>
    </>
  );
}
