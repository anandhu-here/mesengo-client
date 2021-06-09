import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chip, Paper, Divider, LinearProgress, FormControl, TextField } from "@material-ui/core";
import imageCompression from "browser-image-compression";
import Avatar from "@material-ui/core/Avatar";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PhotoRoundedIcon from "@material-ui/icons/PhotoRounded";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import { v4 as uuid } from "uuid";
import Styles from "./Style";
import { usecreatePosts } from "../../Services/postService";
import { darkPrimary } from "../../assets/Colors";

const Form = () => {
  const classes = Styles();
  const { displayName, photoURL } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [uploadData, setUploadData] = useState({
    content: "",
    file: {
      type: "",
      name: "",
      data: "",
      image:""
    },
  });

  const [progress, setProgress] = useState("");
  const createPost = usecreatePosts();
  

  const handleSubmitButton = (e) => {
    e.preventDefault();

    // verify atleast one of the input fields are not empyt
    if (uploadData.content || uploadData.file.data) {
      // if file input is true...upload the file to Fire-Store
      const id = uuid();
      let form_data = new FormData();
      
      form_data.append('content', uploadData.content);
      
      if (uploadData.file.data) {
        
        form_data.append('image', uploadData.file.image, uploadData.file.image.name);
      }
      createPost(form_data).then(data=>{
        dispatch({type:'POST_UPLOADED', payload:data})
        setUploadData({content:"",file: {
          type: "",
          name: "",
          data: "",
          image:""
        },})
      }).catch(e=>console.log(e))
    } 
  };

  // if file name is too long.. compress it
  const fileNameCompressor = (str, limit) => {
    let fileName = str;
    const arr = str.split(".");
    const name = arr[0];
    const ext = arr[arr.length - 1];

    if (name.length > limit) {
      fileName = name.substring(0, limit).trim() + "... ." + ext;
    }
    return fileName;
  };

  const imageUploadHandler = async (e, type) => {
    const inputFile = e.target.files[0];
    const _inputFile = inputFile.type.split("/");
    const inputFileType = _inputFile[0];
    const inputFileExec = _inputFile[1];
    const inputFileName = fileNameCompressor(inputFile.name, 20);

    const fileSize = inputFile.size / (1024 * 1024);

    const acceptedImageFormats = ["png", "jpg", "jpeg", "gif"];
    const acceptedVideoFormats = ["mp4", "mkv", "3gp", "avi", "webm"];

    switch (type) {
      case "video":
        if (!acceptedVideoFormats.some((format) => format.includes(inputFileExec))) {
          alert("Please select video format of mp4 , mkv , av ");
          e.target.value = "";
          return;
        }
        if (fileSize > 10) {
          alert("Please select a video less than 10MB file size");
          e.target.value = "";
          return;
        }
        break;
      case "image":
        if (!acceptedImageFormats.some((format) => format.includes(inputFileExec))) {
          alert("Please select image format of png , jpg , jpeg , gif ");
          e.target.value = "";
          return;
        }
        if (fileSize > 2) {
          alert("Please select an image less than 2MB file size");
          e.target.value = "";
          return;
        }
        break;
      default:
        alert(" OOPS...!!! Invalid file format");
        e.target.value = "";
        return;
    }

    let compressedInputFile = inputFile;
    if (inputFileType === "image") {
      //compression algorithm
      const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        compressedInputFile = await imageCompression(inputFile, compressionOptions);
      } catch (error) {
        alert(error);
      }
    }

    let inputFileDataBase64;
    const file = new FileReader();
    if (compressedInputFile) {
      file.onloadend = (fileLoadedEvent) => {
        inputFileDataBase64 = fileLoadedEvent.target.result;
        setUploadData({
          ...uploadData,
          file: {
            type: inputFileType,
            name: inputFileName,
            data: inputFileDataBase64,
            image:inputFile
          },
        });
      };
      file.readAsDataURL(compressedInputFile);
      console.log(file, "poi")
    }

    // clear the file input event value
    e.target.value = "";
  };

  const resetState = () => {
    setUploadData({
      content: "",
      file: {
        type: "",
        name: "",
        data: "",
      },
    });
    setProgress("");
  };

  return (
    <Paper className={classes.upload}>
      <div className={classes.upload__header}>
        
        <form   className={classes.header__form} >
          <textarea
            aria-multiline
            placeholder={`Something you wanna share?`}
            value={uploadData.content}
            onChange={(e) => setUploadData({ ...uploadData, content: e.target.value })}
          />
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => imageUploadHandler(e, "image")}
          />
          <input
            id="upload-video"
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => imageUploadHandler(e, "video")}
          />
          <button onClick={(e)=>handleSubmitButton(e)} type="submit">Post</button>
        </form>
      </div>
      {uploadData.file.name && !progress && (
        <div className={classes.selectedFile}>
          <Chip
            color="primary"
            size="small"
            onDelete={resetState}
            icon={uploadData.file.type === "image" ? <PhotoRoundedIcon /> : <VideocamRoundedIcon />}
            label={uploadData.file.name}
          />
        </div>
      )}
      {progress ? (
        <div className={classes.uploading}>
          <LinearProgress variant="determinate" value={progress} className={classes.progress} />
          <p>{progress} %</p>
        </div>
      ) : (
        ""
      )}
      <Divider />

      <div className={classes.upload__media}>
        <label htmlFor="upload-video" className={classes.media__options}>
          <VideocamRoundedIcon style={{ color: darkPrimary }} />
        </label>
        <label htmlFor="upload-image" className={classes.media__options}>
          <PhotoRoundedIcon style={{ color: darkPrimary }} />
        </label>
        
      </div>
    </Paper>
  );
};

export default Form;
