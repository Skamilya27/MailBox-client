import React, { useState } from "react";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './ComposeEmail.css'

function ComposeEmail() {
  const [editorState, setState] = useState(() => EditorState.createEmpty());

  const receiverInputRef = useRef();

  const handleChange = (rawDraftContentState) => {
    console.log(rawDraftContentState);
  };

  return (
    <div style={{ margin: "200px" }}>
      <input
        type="text"
        className="text-line radius"
        placeholder="To"
        ref={receiverInputRef}
      />
      <br />
      <br />
      <input type="text" className="text-line radius" placeholder="Subject" />
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
      <Button variant="success">Send</Button>
    </div>
  );
}

export default ComposeEmail;
