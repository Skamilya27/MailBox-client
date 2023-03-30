import React, { useState } from "react";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './ComposeEmail.css'
import { useDispatch } from "react-redux";
import { emailActions } from "../store/email-slice";
import emailjs from 'emailjs-com';

function ComposeEmail() {
  const [editorState, setState] = useState(() => EditorState.createEmpty());

  const receiverInputRef = useRef();
  const subjectInputRef = useRef();

  const dispatch = useDispatch();

  const handleChange = (rawDraftContentState) => {
    // console.log(rawDraftContentState);
  };

  const fromEmail = localStorage.getItem("email");

  const sentEmailHandler = (e) => {
    e.preventDefault();

    const enteredEmail = receiverInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;
    const enteredBody = editorState.getCurrentContent().getPlainText();

    dispatch(emailActions.sendEmail({
      body: enteredBody,
      toEmail: enteredEmail,
      subject: enteredSubject
    }))

    if(enteredEmail === fromEmail) {
      dispatch(emailActions.inboxEmails({
        body: enteredBody,
        fromEmail: fromEmail,
        subject: enteredSubject
      }))
    }

    emailjs
      .send(
        "default_service",
        'template_br18qpd',
        {
          senderEmail: fromEmail,
          receiverEmail: enteredEmail,
          subject: enteredSubject,
          body: enteredBody
        },
        'W3BQLKqIQdm6AE6B'
      )
      .then(res => {
        if(res.status === 200) {

        }
      })
      .catch(err => console.error("Failed to send feedback. Error: ", err))
  }

  return (
    <div style={{ margin: "200px" }}>
      <input type="text" className="text-line" value={fromEmail} readOnly />
      <br/>
      <br/>
      <input
        type="text"
        className="text-line"
        placeholder="To"
        ref={receiverInputRef}
      />
      <br />
      <br />
      <input type="text" className="text-line" placeholder="Subject" ref={subjectInputRef} />
      <br />
      <br />
      <br />
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(editorState) => {
          setState(editorState);
          handleChange(editorState);
        }}
      />
      ;
      <hr />
      <Button variant="success" type="submit" onClick={sentEmailHandler}>Send</Button>
    </div>
  );
}

export default ComposeEmail;
