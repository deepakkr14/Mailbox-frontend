import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Inbox.module.css";
import {ExclamationCircle} from 'react-bootstrap-icons'
import { Row, Col, Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TrashActions } from "../components/Store/Actions/Action";
import "react-toastify/dist/ReactToastify.css";
function Trash() {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails.trashBoxMails);
  useEffect(() => {
    dispatch(TrashActions());
  }, []);
  return (
    <div className={classes.inbox}>
      <h3 className={classes.inboxHeading}> Trash box</h3>
      {mails.length == 0 && (
        <>
          <h5 className={classes.inboxHeading}>No Mails</h5>{" "}
        </>
      )}
      <h3 style={{ color: "red" }}>
      <ExclamationCircle/>  messages will be automatically deleted after 30 days
      </h3>
      {mails.map((mail) => (
        <Container key={mail.id} fluid>
          <Row className={classes.openedMail}>
            <Col className="col-11">
              {/* <NavLink className={classes.navlink} to={`/inbox/${mail._id}`}> */}
              <Row>
                <Col className="fw-bold col-2">{mail.from}</Col>
                <Col className="col-8">
                  <div className={classes.content}>
                    <strong>{mail.subject} </strong>
                  </div>
                </Col>
                <Col className="col-2">
                  <strong>
                    {mail.time.hours}:{mail.time.minutes} {mail.date.day}-
                    {mail.date.month}-{mail.date.year}
                  </strong>
                </Col>
              </Row>
              {/* </NavLink> */}
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
}

export default Trash;
