import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import auth from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./containers/ProfileScreen";
import NotFoundPage from "./containers/NotFoundPage";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // Logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
