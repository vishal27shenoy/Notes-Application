import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./google-keep.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useState } from "react";
import Profile from "./Profile";
import "./index.css";
const Navbar = () => {
  const [profile, setprofile] = useState(false);
  const [data, setdata] = useState({ name: "", username: "", email: "" });
  const [id, setid] = useState(sessionStorage.getItem("id"));
  const [token, settoken] = useState({ jwt: sessionStorage.getItem("JWt") });
  useEffect(() => {
    if (!(data.name && data.username && data.email)) fetchprofiledata();
  }, [data]);
  const fetchprofiledata = () => {
    if (id != null) {
      console.log("hello from get");
      axios.get(`http://localhost:3001/${id}`).then((res) => {
        setdata({
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
        });
      });
    }
  };
  return (
    <div>
      <div className="navbar_container">
        <div className="leftcontainer_navbar">
          <img src={logo} alt="" />
          NOTES
        </div>

        <div className="rightcontainer_navbar">
          <div
            className="profile"
            title={data.name}
            onClick={() => setprofile(!profile)}
          >
            <AccountCircleIcon />
          </div>

          {profile ? (
            <Profile
              valone={data.name}
              valtwo={data.username}
              valthree={data.email}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
