import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Picmes from "./pages/Picmes";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import EmailVerify from "./pages/EmailVerify";


type Token = {
  username: string | '';
  id: string | '';
  avatar: number | null;
  isAdmin: boolean | false;
  likedPost: Array<string> | [];
  followed: Array<string> | [];
};

const App: React.FC = () => {
  const [user, setUser] = useState<Token | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(
    ["token"] || undefined
  );
  const [authenticated, setAuthenticated] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    // setUser(prev => cookies.userInfo)
   
    Axios.get(`${apiUrl}/picmes/verify`)
      .then((response) => {
        const { userExist, username, id, avatar, isAdmin, likedPost, followed } = response.data;
        if (userExist) {
          setUser({ username, id , avatar, isAdmin, likedPost, followed });
          setAuthenticated(true);
          console.log('user')
        }
      })
      .catch((error) => {
        console.log(error)
        return
      });
  }, [apiUrl]);
 
  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          removeCookie,
          setAuthenticated,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />

          {/*nested path for picme and picme items*/}
          <Route path="/picmes">
            <Route index element={<Picmes />} />

            {/* <Route path="/picmes/:id" element={<Picme />} /> */}

            {/* <Route path="/picmes/new" element={<NewPicme />} /> */}

            {/* <Route path="/picmes/:id/edit" element={<EditPicme />} /> */}
            <Route path="/picmes/register" element={<Register />} />
            <Route path="/picmes/login" element={<Login />} />
            <Route path="/picmes/profile/:id" element={<Profile />} />
            <Route path="/picmes/search" element={<Search />} />
            <Route path="/picmes/verifyEmail" element={<EmailVerify/>} />
           
          </Route>

          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
