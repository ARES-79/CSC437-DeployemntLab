import React from 'react';
import { useEffect, useState } from 'react'
import './App.css'
import Profile from './pages/Profile.tsx';
import { usePostFetching } from "./utils/usePostFetching.js";
import { Routes, Route } from "react-router";
import { MainLayout } from "./pages/MainLayout.jsx";
import { PostGallery } from './pages/PostGallery.jsx';
import { CreatePostPage } from './pages/CreatPostPage.jsx';
import { PostDetails } from './pages/PostDetails.jsx';


// type UpdateUserData = {
//   username?: string;
//   profilePicture?: string;
//   location?: string;
//   darkMode?: boolean;
// }

function App() {
  const { isLoading, fetchedPosts } = usePostFetching("", "");
  const [user, setUser] = useState({ //<User>
    userId: '1',
    username: 'burritoMaster123',
    profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg',
    location: 'San Diego, CA',
    darkMode: false,
  });

  useEffect(() => {
    if (user.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [user.darkMode]);

  const handleDarkModeToggle = (event) => {
    const isChecked = event.target.checked;
    updateUser({ darkMode: isChecked });
  };

  const updateUser = (updatedFields) => { //: UpdateUserData
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedFields,  // Merge only the updated fields
    }));
  };

  const POSSIBLE_ROUTES =
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="/" element={
          <PostGallery header="Burrito Discovery Gallery" currentUserId={user.userId}
            isLoading={isLoading} fetchedPosts={fetchedPosts} expandedContent={false} />} />
        <Route path="/post" element={
          <CreatePostPage user={user}/>} />
        <Route path="/profile" element={
          <Profile user={user} updateUser={updateUser}
            isDarkMode={user.darkMode} handleDarkModeToggle={handleDarkModeToggle} />} />
        <Route path="/profiles/:userId" element={
          <Profile user={user} />} />
        <Route path="/posts/:postId" element={
          <PostDetails currentUserId={user.userId} />} />
      </Route>
    </Routes>

  return POSSIBLE_ROUTES;
}

export default App
