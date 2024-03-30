import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Inbox.module.css";
import { Row, Col, Button ,Container,Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../components/Store/MailSlice';
import useHttp from '../components/Hooks/UsdHttp';
import {SentActions} from '../components/Store/Actions/Action'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SentBox() {

  const userEmail = localStorage.getItem('email');
  const userName = userEmail.split("@")[0]
  const dispatch = useDispatch();
  const mails = useSelector(state => state.mails.sentBoxMails);
  const [isLoading, setIsLoading] = useState(null);
  const sendRequest = useHttp();
  const  REACT_URL=import.meta.env.VITE_REACT_API_URL
  useEffect(() => {
    dispatch(SentActions());   
  }, []);
  const deleteMail = async(mail)=>{
    try {
      setIsLoading(mail._id);
      await sendRequest({
        url: `${REACT_URL}/deletes/${userName}/${mail._id}`,
        // endPoint : `${userName}/sentbox/${mail.id}`,
        method : 'DELETE'
      })
      setIsLoading(null);
      dispatch(mailActions.removeSentboxMail(mail._id));
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error)
    }
   
  }
  return (
    <div className={classes.inbox}>
    <h3 className={classes.inboxHeading}> SentBox</h3>
    {mails.length==0 && (
        <>
          <h5 className={classes.inboxHeading}>No Mails</h5>{" "}
        </>
      )}
    {mails.map((mail) => (
      <Container key={mail.id} fluid>
          <Row className={ classes.openedMail }>
            <Col className="col-11">
              <NavLink className={classes.navlink} to={`/sentbox/${mail._id}`}>
                <Row>
                  <Col className="fw-bold col-2">{mail.to}</Col>
                  <Col className="col-8">
                    <div className={classes.content}>
                      <strong>{mail.subject}  </strong>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <strong>
                      {mail.time.hours}:{mail.time.minutes} {" "}
                      {mail.date.day}-{mail.date.month}-{mail.date.year} 
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
                {(isLoading === mail.id) ?   
                  <span>
                    <Spinner as="span" animation="border" size="sm" role="status" 
                      aria-hidden="true"
                    />
                  </span>
                  : 
                  'Delete'
                }
              </Button>
            </Col>
          </Row>
        </Container>
    ))}
  </div>
  )
}

export default SentBox;