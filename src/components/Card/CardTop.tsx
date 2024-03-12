import module from "./CardTop.module.css";
import { useNavigate } from "react-router-dom";

export default function CardTop(props: {
  avatar: number | null;
  username: string;
  date: string;
  authorId: string;
}) {
  const navigate = useNavigate();
  return (
    <div className={module.top}>
      <div className={module["user-info"]}>
        <div className={module.avatar}>
          <img
            src={`/avatar/${props.avatar}.png`}
            className={module.cover}
            alt="avatar"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/picmes/profile/${props.authorId}`);
              navigate(0);
            }}
          />
        </div>
        <h3>
          <b
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/picmes/profile/${props.authorId}`);
              navigate(0);
            }}
          >
            {props.username}
          </b>
          <b>{props.date}</b>
        </h3>
      </div>
    </div>
  );
}
