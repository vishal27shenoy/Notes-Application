import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "./google-keep.svg";
import CheckIcon from "@mui/icons-material/Check";
import "./home.css";
import copy from "copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "./Navbar";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import "./index.css";
const Home = () => {
  const navigate = useNavigate();
  const [yes, setyes] = useState(true);
  const [search, setsearch] = useState("");
  const [value, setvalue] = useState(true);
  const [btn, setbtn] = useState(false);
  const [area, setarea] = useState(false);
  const [call, setcall] = useState("true");
  const [token, settoken] = useState({ jwt: sessionStorage.getItem("JWt") });
  const [id, setid] = useState(sessionStorage.getItem("id"));
  const [data, setdata] = useState({ title: "", description: "" });
  const [notes, setnotes] = useState([]);
  const [update, setupdate] = useState(false);
  const [updateid, setupdateid] = useState(0);
  useEffect(
    () => {
      setidandjwt();
      console.log(id);
      console.log(token.jwt);
      setcall(false);
      if (token.jwt) {
        axios.post("http://localhost:3001/check", token).then((res) => {
          if (res.data.msgcode == 200) {
            console.log("correct");
          }
        });
      } else {
        navigate("/");
      }
      if (id != null) {
        console.log("hello from get");
        axios.get(`http://localhost:3001/${id}`, token).then((res) => {
          setnotes(res.data.notes);
        });
      }
    },
    [call],
    [id],
    [btn],
    [token]
  );
  const setidandjwt = () => {
    settoken({ jwt: sessionStorage.getItem("JWt") });
    setid(sessionStorage.getItem("id"));
  };
  const settingdata = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };
  const senddata = () => {
    if (update && updateid != 0) {
      axios.put(`http://localhost:3001/${id}/${updateid}`, data).then((res) => {
        setdata({ title: "", description: "" });
        fetchnotes();
        setupdate(false);
      });
    } else if (data.title.trim() && data.description && id != -1) {
      axios.post(`http://localhost:3001/${id}`, data).then((res) => {
        console.log(res);
        setdata({ title: "", description: "" });
        fetchnotes();
      });
    }
  };
  const fetchnotes = () => {
    if (id != -1) {
      console.log("hello from get");
      axios.get(`http://localhost:3001/${id}`, token).then((res) => {
        setnotes(res.data.notes);
      });
    }
  };
  const deletevalue = (e) => {
    console.log(e.target.id);
    if (id != -1) {
      axios
        .delete(`http://localhost:3001/${id}/${e.target.id}`, token)
        .then((res) => {
          fetchnotes();
        });
    }
  };
  const updatevalue = (e) => {
    setupdateid(e.target.id);
    setupdate(true);
    console.log(e.target.id);
    setbtn(true);
    notes &&
      notes.map((item) => {
        console.log(item);
        return item._id == e.target.id
          ? setdata({
              title: item.title,
              description: item.description,
            })
          : "";
      });
  };
  const tocopy = (e) => {
    console.log(e.target.id);
    notes &&
      notes.map((item) => {
        return item._id == e.target.id ? copy(item.description) : "";
      });
  };
  return (
    <>
      <Navbar />
      <div className="searchbar">
        <input
          type="text"
          placeholder="search by title.."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          title="search"
          pattern="^[^\s]+[-a-zA-Z\s]+([-a-zA-Z]+)*$"
        />
        <div className="searchicon">
          <SearchIcon />
        </div>
      </div>
      <div
        className="titleanddescription"
        style={{ display: btn ? "block" : "none" }}
      >
        <div className="inputtitle" onClick={() => setarea(true)}>
          <input
            type="text"
            name="title"
            id=""
            placeholder="Title"
            value={data.title}
            onChange={settingdata}
          />
        </div>
        <div className="textareaF" style={{ display: area ? "block" : "none" }}>
          <textarea
            name="description"
            id=""
            cols="35"
            rows="6"
            value={data.description}
            onChange={settingdata}
            placeholder="Description"
          ></textarea>
        </div>
      </div>
      <div
        className="addnotesbutton"
        onClick={() => {
          setbtn(!btn);
          setarea(false);
          senddata();
        }}
      >
        {btn ? <CheckIcon /> : "+"}
      </div>

      <div className="notescontainer">
        <div className="notestitleanddescription">
          {notes &&
            notes.map((item) => {
              return (
                <div className="notescon">
                  <div
                    className="notesbuttondel"
                    id={item._id}
                    onClick={deletevalue}
                  >
                    X
                  </div>
                  <div className="notestitle">
                    Title :{" "}
                    {yes && item.title == search.trim().toLowerCase() ? (
                      <mark>{item.title}</mark>
                    ) : (
                      item.title
                    )}
                  </div>
                  <div className="notesdescription">
                    Description : {item.description}
                  </div>
                  <div className="buttoncontainer">
                    <div className="copybutton" id={item._id} onClick={tocopy}>
                      <ContentCopyIcon
                        style={{ height: "15px" }}
                        id={item._id}
                        onClick={tocopy}
                      />
                    </div>
                    <div
                      className="notesbtnupdate"
                      id={item._id}
                      onClick={updatevalue}
                    >
                      <EditIcon
                        style={{ height: "20px" }}
                        id={item._id}
                        onClick={updatevalue}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
