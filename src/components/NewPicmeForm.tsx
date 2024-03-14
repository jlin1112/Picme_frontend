import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import module from "./css/NewPicmeForm.module.css";
import { styled } from "@mui/material/styles";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import FormMessenger from "./FormMessenger";

export default function NewPicmeForm({
  open,
  handleClose,
  user,
  picmeUploadProps,
}:any) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",

    width: 1,
  });

  const { description, imageToUpload, isUploading } = picmeUploadProps;


  const author = user?.id;
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const [descriptionError, setDescriptionError] = useState(false)

  const apiUrl = process.env.REACT_APP_API_URL;
 

  function handleImage(e:any) {
    picmeUploadProps.setImage(URL.createObjectURL(e.target.files[0]));
    picmeUploadProps.setImageToUpload(e.target.files[0]);
    picmeUploadProps.setRequireImage(false);
  }

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    const createAt = new Date();

  



    if (!picmeUploadProps.imageToUpload && !picmeUploadProps.description) {
      picmeUploadProps.setRequireImage((prev:boolean) => true);
      picmeUploadProps.setRequireDescription((prev:boolean) => true);
      return;
    } else if (!picmeUploadProps.imageToUpload) {
      picmeUploadProps.setRequireImage((prev:boolean) => true);
      return;
    } else if (!picmeUploadProps.description) {
      picmeUploadProps.setRequireDescription((prev:boolean) => true);
      return;
    } else if(picmeUploadProps.description.length > 400){
      setDescriptionError(true)
      return
    }
   
    picmeUploadProps.setIsUploading(true);
    Axios.defaults.withCredentials = true;
    Axios.post(
      `${apiUrl}/picmes/new`,
      {
        description,
        imageToUpload,
        author,
        createAt,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then(function (response) {
        picmeUploadProps.setIsUploading(false);
        handleClose();
        navigate("/picmes")
        navigate(0);
      })
      .catch(function (error) {
        setShowMessage((prev) => true);
        setMessage("Creating failed,please try again later");
        setStatus("Error");
        picmeUploadProps.setIsUploading(false);
      });
  }

  function handleDescription(e:any) {
    picmeUploadProps.setDescription((prev:any) => e.target.value);
    picmeUploadProps.setRequireDescription((prev:boolean) => false);
    setDescriptionError(false)
  }

  return (
  
    <Box className={module.box}>
      {showMessage && (
        <FormMessenger
          message={message}
          status={status}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
        />
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h1 className={module.heading}>
          <i>Create</i>
          <img src="/icons/warning-cross.png" alt="close" onClick={handleClose} />
        </h1>
        <div className={module.underline}></div>
        <div className={module.form}>
          <div className={module["image-section"]}>
            <div className={module.image}>
              <p
                className={
                  picmeUploadProps.requireImage ? "" : module.imgMsgNoshow
                }
              >
                <i style={{ color: "#DB5F58",fontSize:'10pt'}}>Image is required</i>
              </p>
              {picmeUploadProps.image ? (
    
                <img
                  src={picmeUploadProps.image}
                  alt='to be uploaded'
                  className={module.cover}
                />
              ) : (
                <p>
                  <i style={{ color: "#EB9456", fontWeight: "500",fontSize:'10pt' }}>
                    Please upload an image
                  </i>
                </p>
              )}
            </div>
           
            <div className={module.buttons}>
              {picmeUploadProps.image && (
                <>
                <div  className={module["clear-button"]}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<img src="/icons/clear.png" alt="clear"/>}
                 
                  sx={{
                    color: "#fafafa",
                    backgroundColor: "#DB5F58",
                    borderColor: "#fafafa",
                    transition: "0.2s",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#DB5F58",
                      color: "#fafafa",
                      borderColor: "#DB5F58",
                      scale: "1.1",
                    },
                  }}
                  onClick={() => {
                    picmeUploadProps.setImage((prev:any) => null);
                    picmeUploadProps.setImageToUpload((prev:any) => null);
                  }}
                  disabled={isUploading? true : false}
                >
                  Clear Image
                </Button>
                </div>
                <button    onClick={() => {
                    picmeUploadProps.setImage((prev:any) => null);
                    picmeUploadProps.setImageToUpload((prev:any) => null);
                  }}
                  disabled={isUploading? true : false}><img src="/icons/clear.png" alt="clear"  className={module["clear-icon"]}
                 /></button>
                
                </>
              )}

              <Button
                component="label"
                variant="outlined"
                startIcon={<img src="/icons/upload.png" alt="upload" />}
                className={module["upload-button"]}
                sx={{
                  color: "#e8a459",
                  borderColor: "#e8a459",
                  transition: "0.2s",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#fafafa",
                    color: "#EF8453",
                    borderColor: "#EF8453",
                    scale: "1.1",
                  },
                }}
                onChange={handleImage}
                disabled={isUploading? true : false}
              >
               <span>Upload file</span>
                <VisuallyHiddenInput type="file"  accept=".jpg,.png,.jpeg" />

              </Button>
            </div>
          </div>
          <div className={module["description-section"]}>
            <textarea
              id="description"
              cols={50}
              rows={10}
              placeholder="Tell everyone about your PIC!"
              onChange={handleDescription}
              // {...register("description", { required: "Description is required", onChange:handleDescription })}
            ></textarea>
            <p
              className={
                picmeUploadProps.requireDescription ? "" : module.desMsgNoshow
              }
            >
              <i style={{ color: "#DB5F58", fontWeight: "500", fontSize:'10pt' }}>
                Description required
              </i>
            </p>
           {descriptionError &&  <i style={{ color: "#DB5F58", fontWeight: "500" }}>
                Description must less than 400 characters
              </i> }
            
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#eb9456",
                transition: "0.2s",
                height: "60px",
                "&:hover": {
                  backgroundColor: "#eb9456",
                  filter: " brightness(1.05)",
                  scale: "1.02",
                },
              }}
              type="submit"
              disabled={isUploading? true : false}
              className={module['submit-button']}
            >
              {isUploading ? (
                <div className={module.uploadingText}>
                  <div className={module["custom-loader"]}></div>
                  <span><i style={{ color: "#fafafa", fontSize:"10pt"}}>Uploading...</i></span>
                </div>
              ) : (
                <i style={{ color: "#fafafa",fontSize:'10pt' }}>Submit</i>
              )}
            </Button>
          </div>
        </div>
      </form>

   
    </Box>
   
  );
}



