import Button from "@mui/material/Button";
import module from "./DeleteModal.module.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../utils/Loader";

export default function DeleteModal(props: {
  setShowDeleteModal: any;
  picId: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState(false);

  const picId = props.picId;

  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  function handleDelete(event: React.FormEvent) {
    event.preventDefault();
    setIsDeleting(true);
    const token = localStorage.getItem("token");
    Axios.delete(`${apiUrl}picmes/${picId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(function (response) {
        navigate(0);
      })
      .catch(function (error) {
        setError(true);
        setIsDeleting(false);
      });
  }

  return (
    <form className={module.form}>
      {isDeleting ? <h1>Deleting</h1> : <h1>Confirm Delete</h1>}
      <p style={{ color: "#DB5F58" }}>
        {error && "Delete failed, please try again later"}
      </p>

      {isDeleting ? (
        <div className={module.loader}>
          <Loader />
        </div>
      ) : (
        <div className={module["modal-button"]}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#4d4d4f",
              backgroundColor: "#eeeeee",
              transition: "0.2s",
              height: "30px",
              width: "50px",
              "&:hover": {
                borderColor: "#4d4d4f",
                backgroundColor: "#eeeeee",

                scale: "1.02",
              },
            }}
            onClick={() => props.setShowDeleteModal(false)}
          >
            <span style={{ color: "#4d4d4f" }}>Cancel</span>
          </Button>
          <Button
            variant="contained"
            sx={{
              borderColor: "#DB5F58",
              backgroundColor: "#DB5F58",
              transition: "0.05s",
              height: "30px",
              width: "50px",
              "&:hover": {
                borderColor: "#DB5F58",
                backgroundColor: "#DB5F58",
                filter: " brightness(1.05)",

                scale: "1.02",
              },
            }}
            onClick={handleDelete}
          >
            <span style={{ color: "#fafafa" }}>Delete</span>
          </Button>
        </div>
      )}
    </form>
  );
}
