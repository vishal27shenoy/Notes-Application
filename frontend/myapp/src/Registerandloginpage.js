import { React, useEffect, useState } from "react";
import logo from "./google-keep.svg";
import "./registerandloginpage.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
const Registerandloginpage = () => {
  const navigate = useNavigate();
  const [token, settoken] = useState({ jwt: sessionStorage.getItem("JWt") });
  const [id, setid] = useState(sessionStorage.getItem("id"));
  const [click, setclick] = useState(true);
  const [alert, setalert] = useState(false);
  const [check, setcheck] = useState(true);
  const [msg, setmsg] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [register, setregister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [login, setlogin] = useState({ email: "", password: "" });
  const regestration = (e) => {
    setalert(false);
    const { name, value } = e.target;
    setregister({
      ...register,
      [name]: value,
    });
  };
  const loginval = (e) => {
    setalert(false);
    const { name, value } = e.target;
    setlogin({
      ...login,
      [name]: value,
    });
  };
  const loginvalue = () => {
    if (login.email && login.password) {
      axios.post("http://localhost:3001/login", login).then((res) => {
        if (res.data.JWT) {
          sessionStorage.setItem("JWt", res.data.JWT);
          sessionStorage.setItem("id", res.data.id);
          navigate("/home");
        }
        if (res.data.msgcode == 400) {
          setmsg(res.data.message);
          setalert(true);
        }
      });
    }
  };
  const sendregistervalue = () => {
    setalert(false);
    if (register.password == cpassword) {
      axios.post("http://localhost:3001/register", register).then((res) => {
        console.log(res.data.JWT);
        if (res.data.JWT) {
          sessionStorage.setItem("JWt", res.data.JWT);
          sessionStorage.setItem("id", res.data.id);
          navigate("/home");
        }
        if (res.data.msgcode == 400) {
          setmsg(res.data.message);
          setalert(true);
        }
      });
    } else {
      setmsg("password did not matched !");
      setalert(true);
    }
  };
  useEffect(() => {
    removesessionvalues();
  });
  const removesessionvalues = () => {
    if (id && token.jwt) {
      sessionStorage.clear();
    }
  };
  return (
    <>
      <div className="wholecontainer">
        <div className="leftcontainer">
          <div className="image">
            <img src={logo} alt="" />
          </div>
          <div className="textcontainer">
            Notes allows you to store and fetch your information anywhere and
            anytime
          </div>
          <div className="loginbutton">
            <button className="button" onClick={() => setclick(!click)}>
              {click ? "Login" : "Register"}
            </button>
          </div>
        </div>
        <div className="rightconatiner">
          {alert ? <Alert msg={msg} functionalert={setalert} /> : ""}
          <div
            className="circledesign"
            style={{
              left: click ? "80%" : "-2%",
              top: click ? "0%" : "0%",
            }}
          ></div>
          <div
            className="inputcontainer"
            style={{ display: click ? "block" : "none" }}
          >
            <div className="name">
              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={regestration}
                required
              />
            </div>
            <div className="username">
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={regestration}
                required
              />
            </div>
            <div className="email">
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={regestration}
                required
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={regestration}
                required
              />
            </div>
            <div className="confirmpassword">
              <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => {
                  setcpassword(e.target.value);
                  setalert(false);
                }}
                required
              />
            </div>
            <div className="Rbutton">
              <button className="Regbutton" onClick={sendregistervalue}>
                Register
              </button>
            </div>
          </div>
          <div
            className="inputcontainertwo"
            style={{ display: click ? "none" : "block" }}
          >
            <div className="email">
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={loginval}
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={loginval}
              />
            </div>
            <div className="Rbutton">
              <button className="Regbutton" onClick={loginvalue}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registerandloginpage;
