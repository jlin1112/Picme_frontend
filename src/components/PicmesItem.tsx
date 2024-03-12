import * as React from "react";
import { useState } from "react";
import module from "./css/PicmeItem.module.css";
import { useUser } from "../context/userContext";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

const PicmesItem: React.FC<{
  description: string | undefined;
  image: { url: string; filename: string };
  author:
    | { username: string; _id: string; avatar: number; isAdmin: boolean }
    | undefined;
  createAt: string | undefined;
  picmeId: string | undefined;
}> = (props) => {
  const { user = null } = useUser();

  const currentUserId = user?.id;
  const authorId = props.author?._id;

  const [isLoading, setIsLoading] = useState(true);

  const createDate = new Date(props.createAt ? props.createAt : Date.now());
  const detailCreateDate = `${
    createDate.getMonth() + 1
  }-${createDate.getDate()}-${createDate.getFullYear()}`;

  const imageUrl = props.image.url;
  const newUrl = `${imageUrl.slice(0, 50)}/q_10/f_auto/${imageUrl.slice(50)}`;

  return (
    <div className={module.card}>
      <div className={module.top}>
        <div className={module["user-info"]}>
          <div className={module.avatar}>
            <img
              src={
                props.author?.avatar
                  ? `/avatar/${props.author.avatar}.png`
                  : "/icons/account.png"
              }
              className={module.cover}
              alt="avatar"
              width={"110px"}
              height={"110px"}
            />
          </div>
          <h3>
            <b>{props.author?.username}</b>
            <b>{detailCreateDate}</b>
          </h3>
        </div>

        {currentUserId === authorId && (
          <>
            <div className={module.edit}>
              <span style={{ color: "#fafafa" }}>Edit</span>
            </div>
            <div className={module["edit-dot"]}>
              <span style={{ color: "#355070" }}>...</span>
            </div>
          </>
        )}
      </div>

      <div
        className={module.image}
        style={isLoading ? { backgroundColor: "#cacaca" } : {}}
      >
        <img
          src={newUrl}
          alt="picme"
          className={module["image-cover"]}
          style={isLoading ? { display: "none" } : {}}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className={module.description}>{props.description}</div>
    </div>
  );
};

export default PicmesItem;
