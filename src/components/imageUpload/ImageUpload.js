import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import {
  ImageUploadWrapper,
  ImageProgres,
  InputCaption,
  InputUload,
} from "./ImageUpload.style";

const ImageUpload = ({ username, user }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  // This code grab first element(image) when you upload something
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // const { username } = useContext(UserContext);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside  db
            console.log("username");
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <ImageUploadWrapper>
      <ImageProgres value={progress} max="100" />
      <InputCaption
        type="text"
        placeholder="Enter a caption"
        onChange={(event) => setCaption(event.target.value)}
      />
      <InputUload type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </ImageUploadWrapper>
  );
};

export default ImageUpload;
