import "./App.css";
import { useState, useEffect } from "react";
import { verifyUser, signOut } from "./Services/users.js";
import { Routes, Route, useNavigate } from "react-router-dom";

import Dogs from "./Screens/Dogs/Dogs.jsx";
import Home from "./Screens/Home/Home.jsx";
import Navbar from "./Components/Nav/Navbar.jsx";
import SignIn from "./Screens/SignIn/SignIn.jsx";
import SignUp from "./Screens/SignUp/SignUp.jsx";
import EditDog from "./Components/EditDog/EditDog.jsx";
import EditUser from "./Screens/EditUser/EditUser.jsx";
import Signout from "./Screens/Signout/SignOut.jsx";
import UserProfile from "./Screens/UserProfile/UserProfile.jsx";
import Landing from "./Screens/Landing/Landing.jsx";
import Reserve from "./Screens/Reserve/Reserve.jsx";
import AddDog from "./Components/AddDog/AddDog.jsx";

function App() {
  const isAuthenticated = true;
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (!user) {
          const user = await verifyUser();
          setUser(user);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("token");
        navigate("/signin");
      }
    };

    const token = localStorage.getItem("token");
    if (!user) {
      if (token) {
        checkUser();
      }
    }
  });

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} isAuthenticated={isAuthenticated}/>} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signout" element={<Signout setUser={setUser} />} />
        <Route path="/dogs" element={<Dogs setUser={setUser} />} />
        <Route
          path="/editdog/:dogId/edit"
          element={<EditDog setUser={setUser} />}
        />
        <Route
          path="/edituser/:userId/edit"
          element={<EditUser setUser={setUser} />}
        />
        <Route path="/adddog" element={<AddDog user={user} setUser={setUser} accessToken={accessToken} />} />
        <Route path="/profile" element={<UserProfile user={user}  setUser={setUser} accessToken={accessToken} isAuthenticated={isAuthenticated}/>} />
        <Route path="/reserve" element={<Reserve user={user} accessToken={accessToken} isAuthenticated={isAuthenticated}/>} />
      </Routes>
    </div>
  );
}

export default App;
