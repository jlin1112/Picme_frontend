import module from "../components/css/PicThumbnail.module.css";
import { useState } from "react";

export default function PicThumbnail(props: { url: string }) {
  const imageUrl = props.url;
  const newUrl = `${imageUrl.slice(0, 50)}q_10/f_auto/${imageUrl.slice(50)}`;

  const [isLoading, setIsLoading] = useState(true);

  return (
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
  );
}
