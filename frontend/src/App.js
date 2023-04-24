import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PostCreationPage from "./components/PostCreationPage";
import PostPage from "./components/PostPage";
import { createContext, useState } from "react";
import axios from "axios";

export const PostsContext = createContext(null);

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`
      );

      setPosts(!data ? [] : data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className="app">
      <PostsContext.Provider value={{ posts, setPosts, getPosts }}>
        <Router>
          <Routes>
            <Route element={<Home />} path="/"></Route>
            <Route path="posts">
              <Route element={<PostCreationPage />} path="new" />
              <Route element={<PostPage />} path=":id" />
            </Route>
          </Routes>
        </Router>
      </PostsContext.Provider>
    </div>
  );
}

export default App;
