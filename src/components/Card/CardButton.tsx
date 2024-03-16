import module from "./CardButton.module.css";
import { useUser } from "../../context/userContext";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function CardButton(props: {
  setIsEditMode: any;
  setShowDeleteModal: any;
  authorId: string | null;
}) {
  const { user } = useUser();
  const userId = user?.id;
  const authorId = props.authorId;
  const isSameUser = userId === authorId;
  const isAdmin = user?.isAdmin;
  const [isFollowed, setIsFollowed] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  function handleFollow() {
    if (isFollowed) {
      Axios.post(
        `${apiUrl}unfollow/${userId}`,
        { authorId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => {
          return setIsFollowed(false);
        })
        .catch((error) => {
          return;
        });
    } else {
      Axios.post(
        `${apiUrl}follow/${userId}`,
        { authorId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => {
          return setIsFollowed(true);
        })
        .catch((error) => {
          return;
        });
    }
  }

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    if (user) {
      Axios.get(`${apiUrl}follow/${userId}`)
        .then((response) => {
          setIsFollowed(response.data.includes(authorId));
        })
        .catch((error) => {
          setIsFollowed(false);
        });
    }
  }, [user, userId, authorId, apiUrl]);

  return (
    <div className={module.buttons}>
      {!isSameUser && (
        <button
          className={
            isFollowed ? module["followed-button"] : module["follow-button"]
          }
          onClick={handleFollow}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      )}

      {(userId === authorId || isAdmin) && (
        <>
          <button
            className={module.button}
            onClick={() => props.setIsEditMode(true)}
          >
            Edit
          </button>
          <button
            className={module.button}
            style={{ color: "#DB5F58" }}
            onClick={() => props.setShowDeleteModal(true)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
