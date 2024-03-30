import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  FormLabel,
  FloatingLabel,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { mailActions } from "../components/Store/MailSlice";
import useHttp from "../components/Hooks/UsdHttp";
const compose = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userName = userEmail && userEmail.split("@")[0];
const  REACT_URL=import.meta.env.VITE_REACT_API_URL
  const toRef = useRef();
  const subjectRef = useRef();
  const [editorHtml, setEditorHtml] = useState("");
  const [isLoading, setLoading] = useState(false);
  const onEditorChange = (html) => {
    setEditorHtml(html);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const receiverEmail = toRef.current.value;
      const receiverName = receiverEmail.split("@")[0];
      const subject = subjectRef.current.value;
      const editorHtmlwithoutTags = editorHtml.replace(/<[^>]*>/g, "");
      const dateObj = new Date();
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const date = { day, month, year };
      const time = { hours, minutes };

      const sentMessage = {
        date: date,
        time: time,
        toMail: receiverEmail,
        to: receiverName,
        subject: subjectRef.current.value,
        content: editorHtmlwithoutTags,
      };

      // Sending data to the outbox
      const data = await sendRequest({
        url: `${REACT_URL}/adds/${userName}`,

        // endPoint : `${userName}/sentbox`,
        method: "POST",
        body: sentMessage,
      });

      toRef.current.value = "";
      subjectRef.current.value = "";
      const sentData = { id: data.name, ...sentMessage };
      dispatch(mailActions.addSentboxMail(sentData));

      // Sending data to the inbox of the user
      const receiverMessage = {
        date: date,
        time: time,
        from: userName,
        fromMail: userEmail,
        subject: subject,
        content: editorHtmlwithoutTags,
        isRead: false,
      };

      const dataR = await sendRequest({
        url: `${REACT_URL}/addi/${receiverName}`,
        // endPoint : `${receiverName}/inbox`,
        method: "POST",
        body: receiverMessage,
      });
      setLoading(false);
      setEditorHtml("");
      toast.success("Email Sent");
    } catch (error) {
      toast.error(err.message);
    }
  };
  return (
    <div className="box">
      <Form onSubmit={submitHandler}>
        <div className="App">
          <header className="App-header">Compose</header>
          <FormLabel label="Recepient email ">
            <FormControl
              type="email"
              placeholder="Recepient email"
              ref={toRef}
              style={{ marginBottom: "5px" }}
            />
          </FormLabel>
          <FloatingLabel label="Subject:">
            <FormControl
              type="text"
              placeholder="To"
              ref={subjectRef}
              style={{ marginBottom: "5px" }}
            />
          </FloatingLabel>
          <ReactQuill
            theme="snow"
            value={editorHtml}
            onChange={onEditorChange}
          />
          ;
        </div>

        <Button type="submit">
          {isLoading ? (
            <span>
              Sending...
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </span>
          ) : (
            "Send"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default compose;
