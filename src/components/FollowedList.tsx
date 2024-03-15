import { useEffect, useState } from "react";
import Axios from "axios";
import Following from "./Following";
import module from "./css/Followed.module.css";

export default function FollowedList(props: {
  userId: string | undefined;
  setError: any;
  setIsLoading: any;
}) {
  const [followedList, setFollowedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    setIsLoading(true);
    Axios.get(`${apiUrl}picmes/profile/following/${props.userId}`)
      .then(function (response) {
        setFollowedList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        props.setError(true);
        setIsLoading(false);
      });
  }, [props,apiUrl]);

  return (
    isLoading?  <div className={module["loading-wrapper"]}>
    <div className={module["custom-loader"]}></div>
  </div>: 
    <div className={module.container}>
      {followedList.length > 0 ? (
        followedList.map(
          (f: { username: string; avatar: number; id: string }) => (
            <Following
              key={f.id}
              username={f.username}
              avatar={f.avatar}
              id={f.id}
            />
          )
        )
      ) : (
        <p
          style={{
            fontWeight: "700",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
          }}
        >
          No following users yet
        </p>
      )}
    </div>
  );
}
