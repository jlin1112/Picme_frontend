import Axios from "axios";
import { useState, useEffect } from "react";
import module from "./css/PicCard.module.css";
import { useUser } from "../context/userContext";
import CardTop from "./Card/CardTop";
import CardImage from "./Card/CardImage";
import CommentItem from "./Card/CommentItem";
import CommentForm from "./Card/CommentForm";
import { Link } from "react-router-dom";
import CardDescription from "./Card/CardDescription";
import CardButton from "./Card/CardButton";
import Modal from "react-modal";
import DeleteModal from "./Card/DeleteModal";

export default function PicCard(props: {
  picId: string;
  handlePicClose: any;
  getUpdatedDescription: any;
}) {
  type PicmeContent = {
    author: { _id: string; username: string; avatar: number | null };
    createAt: string;
    image: { filename: string; url: string };
    description: string;
    likes: number;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [picmeContent, setPicmeContent] = useState<PicmeContent>({
    author: { _id: "", username: "", avatar: null },
    createAt: "",
    image: { filename: "", url: "" },
    description: "",
    likes: 0,
  });

  const { user } = useUser();
  const currentUserId = user?.id;

  const [comment, setComment] = useState<any>({});
  const createDate = new Date(picmeContent ? picmeContent.createAt : "");
  const detailCreateDate = `${createDate.getMonth()}-${createDate.getDate()}-${createDate.getFullYear()}`;

  const picId = props.picId;

  const [isEditMode, setIsEditMode] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [commentError, setCommentError] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  function handleCommentDelete(event: React.FormEvent) {
    const target = event.target as HTMLButtonElement;
    const commentId = target.id;
    setIsDeletingComment(true);
  
    if (commentId) {
      Axios.delete(
        `${apiUrl}picmes/${props.picId}/comment/${commentId}`
      )
        .then(function (response) {
          setComment(comment.filter((c: any) => c._id !== commentId));
          setIsDeletingComment(false);
        })
        .catch(function (error) {
          setCommentError(true);
          setIsDeletingComment(false);
        });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    Axios.get(`${apiUrl}picmes/${props.picId}`, {
      withCredentials: true,
    })
      .then((response) => {
        setPicmeContent({
          author: response.data.author,
          createAt: response.data.createAt,
          image: response.data.image,
          description: response.data.description,
          likes: response.data.likes,
        });
        setComment(response.data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  }, [props.picId,apiUrl]);

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={handleDeleteModalClose}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, .5)" } }}
        className={module["delete-modal"]}
      >
        <DeleteModal setShowDeleteModal={setShowDeleteModal} picId={picId} />
      </Modal>
      {isLoading ? (
        <div className={module["loading-wrapper"]}>
          <p>Loading</p>
        </div>
      ) : (
        <>
          {error ? (
            <div className={module.loadingFailed}>
              <img src="/icons/error.png" alt="error icon" />
              <h1 style={{ color: "#DB5F58", fontWeight: "700" }}>
                Load data failed
              </h1>
              <p style={{ color: "#DB5F58" }}>Please try again later</p>
            </div>
          ) : (
            <div className={module["card-container"]}>
              <div
                className={module.close}
                onClick={() => props.handlePicClose()}
              >
                <img src="/icons/cross.png" alt="close icon" />
              </div>
              <div className={module.card}>
                <div className={module["card-top"]}>
                  <CardTop
                    avatar={picmeContent.author.avatar}
                    username={picmeContent.author.username}
                    authorId={picmeContent.author._id}
                    date={detailCreateDate}
                  />
                  
                    <CardButton
                      authorId={picmeContent.author._id}
                      setIsEditMode={setIsEditMode}
                      setShowDeleteModal={setShowDeleteModal}
                    />
                  
                </div>

                <CardImage
                  imageUrl={picmeContent.image.url}
                  username={picmeContent.author.username}
                />
                <CardDescription
                  description={picmeContent.description}
                  username={picmeContent.author.username}
                  isEditMode={isEditMode}
                  setIsEditMode={setIsEditMode}
                  currentUserId={currentUserId}
                  picId={picId}
                  getUpdatedDescription={props.getUpdatedDescription}
                />
              </div>

              <div className={module.comment}>
                {comment?.length > 0 ? (
                  <i style={{ fontSize: "1.5em", fontWeight: "700" }}>
                    Comments
                  </i>
                ) : (
                  <i style={{ fontSize: "1.5em", fontWeight: "700" }}>
                    No comments yet
                  </i>
                )}
                <div className={module.comments}>
                  {comment.length > 0 &&
                    comment.map((c: any) => {
                      return (
                        <div className={module["single-comment"]} key={c._id}>
                          <CommentItem
                            avatar={c.author.avatar}
                            username={c.author.username}
                            authorId={c.author.id}
                            commentId={c._id}
                            comment={c.comment}
                          />

                          {user &&
                            (c.author.id === user.id || user.isAdmin) && (
                              <button
                                id={c._id}
                                onClick={handleCommentDelete}
                                disabled={isDeletingComment}
                              >
                                {!isDeletingComment && "X"}
                              </button>
                            )}
                        </div>
                      );
                    })}
                  {commentError && (
                    <p style={{ color: "#DB5F58" }}>
                      Delete comment fail, please try again later
                    </p>
                  )}
                </div>
                <div className={module.form}>
                  {comment && user ? (
                    <CommentForm
                      user={user}
                      setComment={setComment}
                      commentCount={comment.length}
                      likeCount={picmeContent.likes}
                      picId={picId}
                      // setLikedList={props.setLikedList}
                    />
                  ) : (
                    <div className={module["login-comment"]}>
                      <Link to="/picmes/login">
                        <i>login to make comments or follow users!</i>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
