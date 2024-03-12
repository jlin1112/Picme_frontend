import { useState } from "react";
import module from "./CardImage.module.css";

export default function CardImage(props: {
  imageUrl: string;
  username: string;
}) {
  const imageUrl = props.imageUrl
  const newUrl = `${imageUrl.slice(0,50)}/q_70/f_auto/${imageUrl.slice(50)}`

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className={module.image}>
        {isLoading &&     <div className={module.loading}>
          <span>Loading</span>
          <span className={module.loader}></span>
        </div> }

        <img
          src={newUrl}
          alt="picme"
          className={module["image-cover"]}
          onLoad={(e) => setIsLoading(false)}
        />
      </div>
    </>
  );
}
