import { PostsContext } from "../App";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostEditCard from "./PostEditCard";

const PostPage = () => {
  const [currentPost, setCurrentPost] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const { posts, getPosts } = useContext(PostsContext);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getPosts();
    })();
  }, []);

  useEffect(() => {
    const foundPost = posts.find((post) => {
      return post.id === id;
    });

    setCurrentPost(foundPost);
  }, [posts]);

  const deletePost = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`);

      return navigate("/");
    } catch (err) {
      throw new Error(err);
    }
  };

  const editPost = () => {
    setIsEdited(true);
  };

  const closeEditCard = () => {
    setIsEdited(false);
  };

  const postContent = !!currentPost ? (
    <PostCard post={currentPost}>
      <Button onClick={editPost} variant="contained">
        Изменить
      </Button>
      <Button onClick={deletePost} variant="contained" color="error">
        Удалить
      </Button>
    </PostCard>
  ) : null;

  return (
    <>
      {isEdited ? (
        <PostEditCard post={currentPost} onCloseEditCard={closeEditCard} />
      ) : (
        <> {postContent}</>
      )}
    </>
  );
};

export default PostPage;
