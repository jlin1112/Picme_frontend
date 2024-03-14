import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import module from "./CommentForm.module.css";
import Axios from "axios";
import { useState } from "react";

export default function CommentForm(props: {
  user: { username: string; id: string; avatar: number } | null;
  setComment: any;
  picId: string;
  commentCount:number;
  likeCount:number;
  // setLikedList:any
}) {
  type DataToBeSubmitted = {
    comment: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DataToBeSubmitted>();

  const [error, setError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false)

  const [liked, setLiked] = useState(false)

  const [likeCount, setLikeCount] = useState(props.likeCount)

  const picId = props.picId

  const apiUrl = process.env.REACT_APP_API_URL;
  

  Axios.defaults.withCredentials = true;
  function handleComment(data: { comment: string }) {
    const { comment } = data;
    const author = {
      username: props.user?.username,
      id: props.user?.id,
      avatar: props.user?.avatar,
    };
    if(comment.length > 50){
      setMaxLengthError(true)
      return
    } 
    
    Axios.post(`${apiUrl}picmes/${props.picId}/comment`, {
      comment,
      author,
    })
      .then(function (response) {
        const commentId = response.data;
        const newComment = { author, comment, _id: commentId };
        props.setComment((prev: any) => {
          return [...prev, newComment];
        });
      })
      .catch(function (error) {
        setError(true);
      });
    reset();
  }

 const userId = props.user?.id
  const handleLike = (event: any) => {
    
    // const liked = event.target.dataset.liked;
    if (!liked) {
     
      Axios.post(`${apiUrl}picmes/${props.picId}/like`, {
        userId        
      })
        .then(function (response) {
          setLiked((prev) => true);
          setLikeCount((prev) => prev + 1);
         
        })
        .catch(function (error) {
          setLiked((prev) => false);
          setLikeCount((prev) => prev - 1);
        
        });
    } else if (liked) {
   
      Axios.post(`${apiUrl}picmes/${props.picId}/unlike`, {
        userId
      })
        .then(function (response) {
          setLiked((prev:any) => false);
          setLikeCount((prev) => prev - 1);
        })
        .catch(function (error) {
          setLiked((prev:any) => true);
          setLikeCount((prev) => prev + 1);
         
        });
    }
  };


  Axios.post(`${apiUrl}picmes/verifyLiked/${props.user?.id}`,{picId})
      .then(function (response) {
        setLiked(response.data)
      })
      .catch(function (error) {
        setLiked(false)
      });


  return (
    <>
      <div className={module.icons}>
        <div className={module.icon}>
          <img src={!liked ? "/icons/like.png" : "/icons/liked.png"} alt='like icon' onClick={handleLike} />
          <span>{likeCount}</span>
        </div>
        <div className={module.icon}>
          <label htmlFor="comment" style={{cursor:'pointer',padding:'0'}}><img src="/icons/comment.png" alt="comment icon" /></label>
          
          <span>{props.commentCount}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleComment)}>
        <div className={module["comment-input"]}>
          <label htmlFor="comment">
            <div className={module["comment-avatar"]}>
              <img
                src={`/avatar/${props.user?.avatar}.png`}
                className={module["comment-cover"]}
                alt="avatar"
                width={"30px"}
                height={"30px"}
              />
            </div>
          </label>
          <textarea
            id="comment"
            cols={30}
            rows={3}
            style={{ resize: "none" }}
            placeholder="Leave a comment"
            onFocus={()=>{
              setError(false)
              setMaxLengthError(false)
            }}
            {...register("comment", { required: "comment can not be empty"})}
          ></textarea>
        </div>
      
        <i style={{ color: "#DB5F58" }}>{errors.comment?.message}</i>
        <i style={{ color: "#DB5F58" }}>{maxLengthError && 'Comment must below 50 characters'}</i>
        {error && <i style={{ color: "#DB5F58" }}>Error on adding a comment</i>}
        <div className={module["comment-button"]}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#355070",
              backgroundColor: "#fafafa",
              transition: "0.05s",
              height: "24px",
              borderRadius: "16px",
              fontSize: "10pt",
              "&:hover": {
                borderColor: "#355070",
              },
            }}
            type="submit"
          >
            <span style={{ color: "#355070" }}>Submit</span>
          </Button>
        </div>
      </form>
    </>
  );
}
