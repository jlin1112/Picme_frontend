import module from "./CommentItem.module.css";


export default function CommentItem(props: {
  commentId: string;
  avatar: number;
  username: string;
  comment: string;
  authorId: string;
})
{



  

  return (
    <div className={module["single-comment"]}>
      <div className={module["comment-user"]}>
        <div className={module["comment-avatar"]}>
          <img
            src={`/avatar/${props.avatar}.png`}
            className={module["comment-cover"]}
            alt="avatar"
            width={"55px"}
            height={"55px"}
          />
        </div>
        <b>{props.username}</b> - <span>{props.comment}</span>
      </div>

    </div>
  );
}
