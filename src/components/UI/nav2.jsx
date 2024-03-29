import React, { useState,useEffect } from "react";
import "./index.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { InboxActions } from "../Store/Actions/Action";
import { authActions } from "../Store/AuthSlice";
import {
  Trash2,
  Send,
  Pen,
  EnvelopePaper,
  PersonFill,
  BoxArrowLeft,
  List,
  Dash,
} from "react-bootstrap-icons";
import { Outlet, NavLink ,useNavigate} from "react-router-dom";
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // for realtime messaging
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(InboxActions());
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  const inboxMails = useSelector((state) => state.mails.inboxMails);
  let countUnReadMails = 0;
  inboxMails.forEach((each) => {
    if (each.isRead === false) {
      countUnReadMails++;
    }
  });
  const toggle = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    Navigate("/singin");
  };
  return (
    <div className="wrapper">
      <aside id={show ? "sidebar" : "sidebar.expand"}>
        <div className="d-flex">
          <button onClick={toggle} className="toggle-btn" type="button">
            <List />
          </button>
          <div className="sidebar-logo">
            <NavLink href="#" className='header'>My mail</NavLink>
          </div>
        </div>

        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <NavLink to="#" className="sidebar-link">
              <PersonFill size={20} />
              <span> {localStorage.getItem("username").split("@")[0]}</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/" className="sidebar-link">
              <Pen size={20} />{'  '}
              <span className="texts">Compose</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/inbox" className="sidebar-link">
              <EnvelopePaper size={20} />{'  '}
              <span>
                Inbox <Dash /> {countUnReadMails}
              </span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/sent" className="sidebar-link">
              <Send size={20} />{' '}
              <span>Sent Box</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/trash" className="sidebar-link">
              <Trash2 size={20} />
              <span>Trash Box</span>
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Button onClick={() => handleLogout()} variant="outline-danger" className="sidebar-link">
            <BoxArrowLeft size={30} />
            <span> Log out</span>
          </Button>
        </div>
      </aside>
      <div className="main p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
