import { useNavigate } from "react-router-dom";
import module from "./css/Following.module.css";

export default function Following(props: {
  id: string;
  username: string;
  avatar: number;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={module.span}
      onClick={() => {
        navigate(`/picmes/profile/${props.id}`);
        navigate(0);
      }}
    >
      <span className={module["comment-avatar"]}>
        <div className={module["image-cover"]}>
          <img
            src={`/avatar/${props.avatar}.png`}
            className={module["comment-cover"]}
            alt="avatar"
          />
        </div>

        <span className={module.username}>{props.username}</span>
      </span>
    </div>
  );
}
