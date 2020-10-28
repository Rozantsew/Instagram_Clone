import React, { useState, useEffect } from "react";
import PostTemplate from "./PostTemplate";
import { db } from "../../firebase";

const Post = ({ username, postId }) => {
  const [posts, setPosts] = useState([]);

  // conso;

  // useEffect runs a piece of code based on a specific condition
  useEffect(() => {
    // this is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // every time a new post is added, this code fires...
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const PostItem = posts.map(({ id, post, user }) => (
    <PostTemplate
      key={id}
      user={user}
      postId={id}
      username={post.username}
      caption={post.caption}
      imageUrl={post.imageUrl}
      avatar={post.avatar}
    />
  ));

  return <div>{PostItem}</div>;
};

export default Post;
