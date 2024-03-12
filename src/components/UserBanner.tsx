import module from "./css/UserBanner.module.css";
import { Link} from "react-router-dom";
import { useUser } from "../context/userContext";

export default function UserBanner() {
  const { user} = useUser();
 
  return (
    <div className={module.user}>
      <div className={module.profile}>
        <div className={module.avatar}>
        <Link to={`/picmes/profile/${user?.id}`} state={user} style={{textDecoration:'none'}} >
          <img
            src={
              user?.avatar ? `/avatar/${user.avatar}.png` : "/icons/account.png"
            }
            className={module.cover}
            alt="avatar"
            width={"110px"}
            height={"110px"}
            style={user?.avatar ? { padding: "0px" } : { padding: "5px" }}
          />
          </Link>
        </div>

        <div className={module.username}>
          {user ? (
             <Link to={`/picmes/profile/${user?.id}`} state={user} style={{textDecoration:'none'}} >
            <p>{user.username}</p>
            </Link>
          ) : (
            <Link to="/picmes/login" style={{ cursor: "pointer" }}>
              <span style={{ color: "#fafafa" }}>Login/Register</span>
            </Link>
          )}
        </div>
      </div>
      <Link to={`/picmes/profile/${user?.id}`} state={user} style={{textDecoration:'none'}} >
        {user && (
          <div className={module["profile-link"]}>
            <i style={{color:'#000'}}>Profile</i>
          </div>
        )}
      </Link>
    </div>
  );
}
