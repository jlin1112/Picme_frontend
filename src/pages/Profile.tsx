import { useParams } from "react-router-dom";
import NewPicmeForm from "../components/NewPicmeForm";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import NavMenu from "../components/NavMenu";
import module from "../css/Profile.module.css";
import { useUser } from "../context/userContext";
import Axios from "axios";
import FollowedList from "../components/FollowedList";
import PicCard from "../components/PicCard";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import MyPicList from "../components/MyPicList";
import MyLikeList from "../components/MyLikeList";

export default function Profile(props: any) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams() || "";
  const navigate = useNavigate();

  const [active, setActive] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const [picList, setPicList] = useState<[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [avatar, setAvatar] = useState<number>();
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState(false);

  const { user, removeCookie, setAuthenticated, setUser } = useUser();
  const userId = user?.id;
  const userAuthProps = { user, removeCookie, setAuthenticated, setUser };
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const [image, setImage] = useState(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [description, setDescription] = useState("");
  const [requireImage, setRequireImage] = useState(false);
  const [requireDescription, setRequireDescription] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const picmeUploadProps = {
    image,
    setImage,
    imageToUpload,
    setImageToUpload,
    description,
    setDescription,
    requireImage,
    setRequireImage,
    requireDescription,
    setRequireDescription,
    setIsUploading,
    isUploading,
  };

  const [open, setOpen] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [showPic, setShowPic] = useState(false);
  const [currentShowPicId, setCurrentShowPicId] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (isUploading) {
      return;
    }
    setImage((prev) => null);
    setImageToUpload((prev) => null);
    setDescription((prev) => "");
    setRequireImage((prev) => false);
    setRequireDescription((prev) => false);
    setOpen(false);
  };

  const handlePicClose = () => {
    setShowPic(false);
  };

  const handleLoginFormOpen = () => setLoginFormOpen(true);
  const handleLoginFormClose = () => setLoginFormOpen(false);
  const handleModalProps = {
    handleOpen,
    handleClose,
    handleLoginFormOpen,
    handleLoginFormClose,
  };

  function handleButton(e: React.MouseEvent) {
    setActive(e.currentTarget.id);
  }


  function handleLikedList(e: React.MouseEvent) {
    setActive("2");
    setIsLoading(true);
    Axios.get(`${apiUrl}picmes/likedList/${id}`)
      .then(function (response) {
        setPicList(response.data);
        setTotalPage(response.data.length);
        setIsLoading(false);
      })
      .catch(function (error) {
        setError(true);
        setIsLoading(false);
      });
  }

  function handlePicList(e: React.MouseEvent) {
    setActive("1");
    setIsLoading(true);
    Axios.get(`${apiUrl}picmes/profile/${id}`)
      .then(function (response) {
        setPicList(response.data.picList);
        setTotalPage(response.data.picList.length);
        setIsLoading(false);
      })
      .catch(function (error) {
        setError(true);
        setIsLoading(false);
      });
  }

  function handlePicClick(e: React.MouseEvent) {
    setShowPic(true);
    setCurrentShowPicId(e.currentTarget.id);
  }



  Axios.defaults.withCredentials = true;
  useEffect(() => {
    setIsLoading(true);
    Axios.get(`${apiUrl}picmes/profile/${id}`)
      .then(function (response) {
        setAvatar(response.data.avatar);
        setUsername(response.data.username);
        setPicList(response.data.picList);
        setTotalPage(response.data.picList.length);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  }, [id,apiUrl]);

  function conditionalRender(activePage: string) {
    switch (activePage) {
      case "1":
        return isLoading ? (
          <p>Loading</p>
        ) : (
          <MyPicList
            picList={picList}
            handlePicClick={handlePicClick}
            totalPage={totalPage}
            isLoading={isLoading}
          />
        );
      case "2":
        return (
          <MyLikeList
            picList={picList}
            handlePicClick={handlePicClick}
            totalPage={totalPage}
            isLoading={isLoading}
          />
        );
      case "3":
        return (
          <div className={module.following}>
            <FollowedList userId={id} setError={setError} setIsLoading={setIsLoading} />
          </div>
        );
    }
  }

  return (
    <>
      <div className={module.body}>
        <Modal
          isOpen={showPic}
          onRequestClose={handlePicClose}
          className={module["card-modal"]}
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, .5)" } }}
        >
          <PicCard
            picId={currentShowPicId}
            handlePicClose={handlePicClose}
            getUpdatedDescription={""}
          />
        </Modal>

        <Modal
          isOpen={open}
          onRequestClose={handleClose}
          className={module.modal}
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, .5)" } }}
        >
          <NewPicmeForm
            open={open}
            handleClose={handleClose}
            user={user}
            picmeUploadProps={picmeUploadProps}
          />
        </Modal>

        <Modal
          isOpen={loginFormOpen}
          onRequestClose={handleLoginFormClose}
          className={module["login-modal"]}
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, .5)" } }}
        >
          <LoginForm
            handleLoginFormClose={handleLoginFormClose}
            setUser={setUser}
          />
        </Modal>

        <div className={module.nav}>
          <NavMenu
            handleModalProps={handleModalProps}
            userAuthProps={userAuthProps}
            setIsLoggingOut={setIsLoggingOut}
          />
        </div>

        <div className={module.main}>
          <div className={module.heading}>
            {user && userId !== id && (
              <div
                // to={`/picmes/profile/${user?.id}`}
                // state={user}
                style={{ textDecoration: "none" }}
                className={module["my-profile"]}
                onClick={() => {
                  navigate(`/picmes/profile/${user?.id}`);
                  navigate(0);
                }}
              >
                <div className={module["profile-link"]}>
                  <i>My Profile</i>
                </div>
              </div>
            )}

            <div className={module.user}>
              <div className={module.avatar}>
                {!error && (
                  <img
                    src={
                      avatar ? `/avatar/${avatar}.png` : `/icons/account.png`
                    }
                    className={module.cover}
                    alt="avatar"
                  />
                )}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  color: "#fafafa"
                }}
              >
                {username}
              </div>
            </div>
          </div>

          {!error ? (
            <div className={module.options}>
              <div
                id="1"
                className={active === "1" ? module.active : ""}
                onClick={handlePicList}
              >
                <img src="/icons/pic.png" alt="my posts logo" />
                <span>Pics</span>
              </div>
              <div
                id="2"
                className={active === "2" ? module.active : ""}
                onClick={handleLikedList}
              >
                <img src="/icons/like2.png" alt="liked logo" />
                <span>Liked Pic</span>
              </div>
              <div
                id="3"
                className={active === "3" ? module.active : ""}
                onClick={handleButton}
              >
                 <img src="/icons/user.png" alt="user logo" />
                <span>Following</span>
              </div>
            </div>
          ) : (
            <div className={module.loadingFailed}>
              <img src="/icons/error.png" alt="error icon" />
              <h1 style={{ color: "#DB5F58", fontWeight: "700" }}>
                User not found
              </h1>
              <p style={{ color: "#DB5F58" }}>Please try again later</p>
            </div>
          )}

          <div className={module.content}>
            {isLoading ? (
              <div className={module["loading-wrapper"]}>
                <div className={module["custom-loader"]}></div>
              </div>
            ) : (
              <> {conditionalRender(active)}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
