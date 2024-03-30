import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Button, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./Inbox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../components/Store/MailSlice";
import useHttp from "../components/Hooks/UsdHttp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inbox() {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const [isLoading, setIsLoading] = useState(null);
  const mailsact = useSelector((state) => state.mails.inboxMails);
  // console.log(mailsact)
  const userEmail = localStorage.getItem("email");
  const userName = userEmail.split("@")[0];
  const  REACT_URL=JSON.stringify(import.meta.env.VITE_REACT_API_URL)

  const openMail = async (mail) => {
    try {
      dispatch(mailActions.updatedInboxMail(mail));
      await sendRequest({
        // endPoint: `${userName}/inbox/${mail.id}`,
        url:`${REACT_URL}/update/${userName}/${mail._id}`,
        method: "PUT",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteMail = async (mail) => {
    try {
      setIsLoading(mail._id);
      await sendRequest({
        // endPoint: `${userName}/inbox/${mail._id}`,
        url: `${REACT_URL}/deletei/${userName}/${mail._id}` ,  
        method: "DELETE",
      });
      setIsLoading(null);
      dispatch(mailActions.removeInboxMail(mail._id));
      toast.success( "Message Deleted Successfully!");
    } catch (error) {
      toast.error("Error deleting the message")
    }
  };

  return (
    <div className={classes.inbox}>
      <h3 className={classes.inboxHeading}>Inbox </h3>

      {mailsact.length==0 && (
        <>
          <h5 className={classes.inboxHeading}>No Mails</h5>{" "}
        </>
      )}
      {mailsact.map((mail) => (
        <Container fluid key={mail._id}>
          <Row
            key={mail._id}
            className={mail.isRead ? classes.openedMail : classes.notOpenedMail}
          >
            <Col className="col-11">
              <NavLink className={classes.navlink} to={`/inbox/${mail._id}`}>
                <Row onClick={openMail.bind(null, mail)}>
                  <Col className="fw-bold col-2">{mail.from}</Col>
                  <Col className="col-8">
                    <div className={classes.content}>
                      <strong>{mail.subject}  </strong>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <strong>
                      {mail.time.hours}:{mail.time.minutes} {mail.date.day}-
                      {mail.date.month}-{mail.date.year}
                    </strong>
                  </Col>
                </Row>
              </NavLink>
            </Col>
            <Col className="col-1">
              <Button
                onClick={deleteMail.bind(null, mail)}
                style={{ padding: "0px 5px" }}
                variant="danger"
              >
                {isLoading === mail._id ? (
                  <span>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </span>
                ) : (
                  "Delete"
                )}
              </Button>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
}

export default Inbox;
