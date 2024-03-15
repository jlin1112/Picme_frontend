import { useState } from "react";
import module from "./CardDescription.module.css";
import Axios from "axios";
import Loader from "../utils/Loader";

export default function CardDescription(props: {
  description: string;
  username: string;
  isEditMode: boolean;
  setIsEditMode: any;
  currentUserId: string;
  picId: string;
  getUpdatedDescription: any;
}) {
  const [error, setError] = useState({ isError: false, message: "" });
  const [description, setDescription] = useState(props.description);
  const [isEditing, setIsEditing] = useState(false);

  const currentUserId = props.currentUserId || "";
  const picId = props.picId || "";

  const apiUrl = process.env.REACT_APP_API_URL;

  function handleCancel(e: React.MouseEvent) {
    e.preventDefault();
    props.setIsEditMode(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setIsEditing(true);
    const description = e.target[0].value || "";
    const token = localStorage.getItem("token");
    if (!description) {
      setError({ isError: true, message: "Description required" });
      setIsEditing(false);
    } else {
      Axios.patch(
        `${apiUrl}picmes/${picId}`,
        {
          description,
          currentUserId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then(function (response) {
          setDescription(description);
          props.getUpdatedDescription(picId, description);
          setIsEditing(false);
          props.setIsEditMode(false);
        })
        .catch(function (error) {
          setError({
            isError: true,
            message: "Edit failed, please try again later",
          });
          setIsEditing(false);
        });
    }
  }

  return props.isEditMode ? (
    <form onSubmit={handleSubmit}>
      <textarea
        defaultValue={props.description}
        className={module["edit-description"]}
        name="description"
        id="description"
      ></textarea>
      <p style={{ color: "#DB5F58" }}>{error.isError && error.message}</p>
      <div className={module["edit-buttons"]}>
        {isEditing ? (
          <Loader />
        ) : (
          <>
            {" "}
            <button
              style={{ color: "#fafafa", backgroundColor: "#355070" }}
              type="submit"
            >
              Edit
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
    </form>
  ) : (
    <h4 className={module.description}>
      <b>{props.username} </b>
      {description}
    </h4>
  );
}
