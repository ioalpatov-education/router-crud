import { useEffect, useContext } from "react";
import { Button } from "@mui/material";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import { PostsContext } from "../App";

const Home = () => {
  const { posts, getPosts } = useContext(PostsContext);

  useEffect(() => {
    (async () => {
      await getPosts();
    })();
  }, []);

  const postList = posts.map((post) => {
    return <PostCard key={post.id} post={post} />;
  });

  return (
    <section className="home-page">
      <header className="home__header">
        <Button className="post-creation-btn" variant="contained">
          <Link to="posts/new">Создать пост</Link>
        </Button>
      </header>
      {!!posts.length ? <ul className="posts-list">{postList}</ul> : null}
    </section>
  );
};

export default Home;
