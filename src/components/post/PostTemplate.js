import React, { useContext, useEffect, useState } from "react";
import {
  Post,
  UserName,
  StyledAvatar,
  PostImage,
  PostParagraph,
  PostComment,
  PostHeaderWrapper,
  UserNameBold,
  CommentForm,
  StyledInput,
  StyledButton,
} from "./Post.style.js";
import { db } from "../../firebase";
import firebase from "firebase";
import { UserContext } from "../../context/UserContext";

function PostTemplate({ postId, username, caption, imageUrl, avatar }) {
  const { user } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // adding ability to comment the post
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <Post>
      <PostHeaderWrapper>
        <StyledAvatar
          src={avatar}
          className="post__avatar"
          alt="Rafal Devoza"
        />
        <UserName>{username}</UserName>
      </PostHeaderWrapper>
      <PostImage
        src={imageUrl}
        alt="react-firebase logo"
        className="post__image"
      ></PostImage>
      <PostParagraph>
        <UserNameBold>{username}</UserNameBold>
        {caption}
      </PostParagraph>
      <div>
        {comments.map((comment) => (
          <PostComment>
            <UserNameBold>{comment.username}</UserNameBold>
            {comment.text}
          </PostComment>
        ))}
      </div>
      {user && (
        <CommentForm>
          <StyledInput
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <StyledButton disabled={!comment} type="submit" onClick={postComment}>
            Post
          </StyledButton>
        </CommentForm>
      )}
    </Post>
  );
}

export default PostTemplate;
