import module from "./css/NavMenu.module.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useUser } from "../context/userContext";
import { useState } from "react";
import Modal from "react-modal";
import Guidelines from "./Guidelines";
import Author from "./Author";
import path from "path";

export default function NavMenu({
  handleModalProps,
  messageProps,
  userAuthProps,
  setIsLoggingOut,
}: any) {
  const navigate = useNavigate();

  const [mouseEnter, setMouseEnter] = useState(false);

  const [showAuthor, setShowAuthor] = useState(false)
  const [showGuidelines, setShowGuidelines] = useState(false)

  const { user } = useUser();

  const apiUrl = process.env.REACT_APP_API_URL;

  const getCookie = (name:string) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
};
 

  Axios.defaults.withCredentials = true;
  function handleLogOut() {
    setIsLoggingOut(true);
    Axios.delete(`https://picme.onrender.com/logout`)
      .then((response) => {
        
        const token = getCookie('token');
        console.log('Token:', token);

        userAuthProps.removeCookie("userInfo");
        userAuthProps.removeCookie("token",{path:'/',domain:'picme.onrender.com'});
        userAuthProps.setUser(null);
        userAuthProps.setAuthenticated(false);
        // clearCookie("token");
        setIsLoggingOut(false);
      })
      .catch((error) => {
        setIsLoggingOut(false);
        messageProps.setStatus("Error");
        messageProps.setMessage("unable to logout");
      });
    // navigate(0);
  }

  return (
    <>
     <Modal
        isOpen={showAuthor}
        onRequestClose={()=>setShowAuthor(false)}
        className={module["card-modal"]}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, .5)" } }}
      >
         <div>
          <Author/>
        </div>
      </Modal>

      <Modal
        isOpen={showGuidelines}
        onRequestClose={()=>setShowGuidelines(false)}
        className={module["card-modal"]}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, .5)" } }}
      >
         <div>
          <Guidelines/> 
        </div>
      </Modal>


      <div className={module.body}>
        <aside className={module.sidebar}>
          <header
            className={module["sidebar-header"]}
            onClick={() => navigate("/")}
          >
            <img className={module["logo-img"]} src={"/picme.png"} alt="logo" />
            <img
              className={module["logo-icon"]}
              src={"/icons/pic.png"}
              alt="logo-icon"
            />
          </header>
          <nav className={module.nav}>
            <button
              onClick={() => {
                navigate("/picmes");
                navigate(0);
              }}
              className={module.button}
            >
              <span>
                <img src="/icons/home.png" alt="home icon" />
                <span>Home</span>
              </span>
            </button>

            <button
              onClick={
                userAuthProps?.user
                  ? handleModalProps?.handleOpen
                  : handleModalProps?.handleLoginFormOpen
              }
              className={module.button}
            >
              <span>
                <img src="/icons/create.png" alt="create icon" />
                <span>Create</span>
              </span>
            </button>
            <button
              className={module.button}
              onClick={() => navigate("/picmes/search")}
            >
              <span>
                <img src="/icons/search.png" alt="search icon" />
                <span>Search</span>
              </span>
            </button>
            {user && (
              <button
                className={module.button}
                onClick={() => navigate(`/picmes/profile/${user?.id}`)}
              >
                <span>
                  <img src="/icons/user.png" alt="user icon" />
                  <span>My Profile</span>
                </span>
              </button>
            )}

            <button
              className={module.button}
              onClick={() => setShowAuthor(true)}
            >
              <span>
                <img src="/icons/author.png" alt="author icon" />
                <span>Developer Info</span>
              </span>
            </button>

            <button
              className={module.button}
              onClick={() => setShowGuidelines(true)}
            >
              <span>
                <img src="/icons/guide.png" alt="guide icon" />
                <span>Community Guidelines</span>
              </span>
            </button>

            {!userAuthProps?.user ? (
              <button
                onClick={handleModalProps?.handleLoginFormOpen}
                className={module.button}
              >
                <span>
                  <img
                    src="/icons/login.png"
                    alt="login icon"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <span>Login</span>
                </span>
              </button>
            ) : (
              <button
                className={module["logout-button"]}
                onClick={handleLogOut}
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => setMouseEnter(false)}
              >
                <span>
                  <img
                    src={
                      mouseEnter
                        ? "/icons/logout-white.png"
                        : "/icons/logout.png"
                    }
                    alt="logout icon"
                  />
                  <span>Logout</span>
                </span>
              </button>
            )}
          </nav>
        </aside>
      </div>
    </>
  );
}
