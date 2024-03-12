
import NewPicmeForm from "../components/NewPicmeForm";
import Modal from "react-modal";
import React, {  useState } from "react";
import NavMenu from "../components/NavMenu";
import { useUser } from "../context/userContext";
import PicCard from "../components/PicCard";
import LoginForm from "../components/LoginForm";
import UserBanner from "../components/UserBanner";
import PicmesItem from "../components/PicmesItem";
import ReactPaginate from "react-paginate";
import module from '../css/Search.module.css'
import SearchBar from "../components/utils/SearchBar";



export default function Search () {
    
    type dataType = {
        _id: string;
        description: string;
        image: { filename: string; url: string };
        author: { username: string; _id: string; avatar: number; isAdmin: boolean };
        createAt: string;
        likes: number;
        comments: Array<string>;
      };
    
      const [data, setData] = useState([]);
      const [totalPage, setTotalPage] = useState(0)
      const [error, setError] = useState(false);
      const { user, removeCookie, setAuthenticated, setUser } = useUser();
      const userAuthProps = { user, removeCookie, setAuthenticated, setUser };
    
      //page
      const [currentPage, setCurrentPage] = useState(0);
    
      //messenger
      const [message, setMessage] = useState<string | null>(null);
      const [status, setStatus] = useState<string | null>(null);
      const messageProps = { setMessage, setStatus };
    
      //image upload
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
    
      //modal
      const [open, setOpen] = useState(false);
      const [loginFormOpen, setLoginFormOpen] = useState(false);
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
      const handleLoginFormOpen = () => setLoginFormOpen(true);
      const handleLoginFormClose = () => setLoginFormOpen(false);
      const handleModalProps = {
        handleOpen,
        handleClose,
        handleLoginFormOpen,
        handleLoginFormClose,
      };
    
      //loading state
      const [isLoading, setIsLoading] = useState(false);

      const [noResult, setNoResult] = useState(false)
    
      const [showPic, setShowPic] = useState(false);
      const [currentShowPicId, setCurrentShowPicId] = useState("");
    
      const handlePicClose = () => {
        setShowPic(false);
      };
    
      function handlePicClick(e: React.MouseEvent) {
        setShowPic(true);
        setCurrentShowPicId(e.currentTarget.id);
      }
    
      function getUpdatedDescription(id: string, description: string) {
        const newData = [...data];
        newData.map((d: any) => {
          if (d._id === id) {
           d.description = description;
          }
          return newData
        });
        setData(newData);
      }
    
      const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
      };
    
    
    
    return(
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
            getUpdatedDescription={getUpdatedDescription}
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
          className={module.modal}
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
            messageProps={messageProps}
            userAuthProps={userAuthProps}
          />
        </div>
  
        <div className={module.main}>

  
          <UserBanner />
          {error && (
            <div className={module.loadingFailed}>
              <img src="/icons/error.png" alt="error icon" />
              <h1 style={{ color: "#DB5F58", fontWeight: "700" }}>
                Load data failed
              </h1>
              <p style={{ color: "#DB5F58" }}>Please try again later</p>
            </div>
          )}
  
          {/* picme content------------------------------------------------------------------------------------ */}
         {(!isLoading && !error) && <SearchBar setData={setData} setIsLoading={setIsLoading} setError={setError} setNoResult={setNoResult} setTotalPage={setTotalPage} currentPage={currentPage}/>}
          {noResult && <p className={module['not-found']}>No Pic Found</p>}
          {isLoading ? (
            <div className={module["loading-wrapper"]}>
              <div className={module["custom-loader"]}></div>
            </div>
          ) : !error ? (
            <div className={module["items-container"]}>
              { data?.slice(currentPage*10, currentPage*10+9).map((p: dataType) => {
                return (
                  <div
                    key={p._id}
                    id={p._id}
                    className={module.container}
                    onClick={handlePicClick}
                  >
                    <PicmesItem
                      picmeId={p._id}
                      description={p.description}
                      image={p.image}
                      author={p.author}
                      createAt={p.createAt}
                    />
                  </div>
                );
              })}
              {}
            </div>
          ) : (
            ""
          )}
  
          {!error && (
            <div className={module["pagination-wrapper"]}>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                initialPage={0}
                pageCount={isLoading ? 0 : Math.ceil(totalPage/9)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                activeClassName={module["active-page"]}
                className={module.pagination}
              />
            </div>
          )}
        </div>
      </div>
    )
}