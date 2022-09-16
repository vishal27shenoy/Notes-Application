import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
const Profile = ({ valone, valtwo, valthree }) => {
  const navigate = useNavigate();
  const [token, settoken] = useState({ jwt: sessionStorage.getItem("JWt") });
  const [id, setid] = useState(sessionStorage.getItem("id"));
  const clear = () => {
    console.log("hello");
    if (id && token.jwt) {
      sessionStorage.clear();
      navigate("/");
    }
  };
  return (
    <>
      <Navbar />
      <div className="profilecontainer">
        <div className="profilepic">
          <AccountCircleIcon style={{ height: "80px", width: "80px" }} />
        </div>
        <div className="Pname">Signed in as : {valone}</div>
        <div className="Pusername">Your Username : {valtwo}</div>
        <div className="Pemail">Your Email : {valthree}</div>
        <div className="Plogoutbtn" onClick={clear}>
          <button className="plogoutbtn" onClick={clear}>
            <LogoutIcon onClick={clear} />
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
