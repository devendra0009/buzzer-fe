import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./store/store";
import { login, logout, setTokenInitially } from "./slices/authSlice";
import Authentication from "./pages/Authentication/Authentication";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import PrivateRoute from "./components/protected/ProtectedComp";
import PrivateAuthRoute from "./components/protected/ProtectedAuthComp";
import LayoutComp from "./components/layout/LayoutComp";
import SearchComp from "./components/search/SearchComp";
import ReelsComp from "./components/reels/ReelsComp";
import ExploreComp from "./components/explore/ExploreComp";
import CreatePostComp from "./components/create/CreatePostComp";
import ProfileComp from "./components/profile/ProfileComp";
import {
  getPostsByUserId,
  getReelsByUserId,
  getUserDetailsByToken,
} from "./slices/userSlice";
import MessagesComp from "./components/messages/MessagesComp";
import { getReelsByUserIdFromApi } from "./apis/reel/reelApi";
import { getAllReels } from "./slices/reelSlice";
import { getAllPosts } from "./slices/postSlice";
import { getAllStoryForUser } from "./slices/storySlice";
import ProfilePage from "./pages/profile/ProfilePage";
import PostModal from "./components/reusableComp/PostModal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <LayoutComp />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <SearchComp /> },
      { path: "/explore", element: <ExploreComp /> },
      { path: "/reel/:reelId", element: <ReelsComp /> },
      { path: "/inbox", element: <MessagesComp /> },
      { path: "/post/:postId", element: <PostModal /> },
      { path: "/create-post", element: <CreatePostComp type="POST" /> },
      { path: "/create-reel", element: <CreatePostComp type="REEL" /> },
      { path: "/profile/:pid", element: <ProfilePage /> },
    ],
  },
  {
    path: "/login",
    element: (
      <PrivateAuthRoute>
        {" "}
        <Authentication />
      </PrivateAuthRoute>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    ;
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setTokenInitially({ token }));
      dispatch(getUserDetailsByToken(token)).then((data) => {
        // console.log(data);
        dispatch(getAllPosts());
        dispatch(getAllReels());
        dispatch(getAllStoryForUser());
      });
    }
  }, []);
  return (
    // <>
    //   <Authentication />
    // </>
    <RouterProvider router={router} />
  );
}

export default App;
