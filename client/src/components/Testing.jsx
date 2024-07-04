import React, { useRef, useLayoutEffect, useEffect } from "react";
import CodeMirror from "codemirror";
import { io } from "socket.io-client";

import "codemirror/mode/javascript/javascript";
import "codemirror/keymap/sublime";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/xq-light.css";
import "./customCodemirror.css";

const socket = io(process.env.REACT_APP_BASE);

const CodeEditor = ({ defaultValue = "", onChange }) => {
  const textAreaRef = useRef(null);
  const editorRef = useRef(null);

  useLayoutEffect(() => {
    if (textAreaRef.current) {
      // Initialize CodeMirror editor
      const editor = CodeMirror.fromTextArea(textAreaRef.current, {
        lineNumbers: true,
        theme: "material",
        keyMap: "sublime",
      });

      editor.setSize("100%", "100%");
      editor.setValue(defaultValue);
      editorRef.current = editor;

      editor.on("change", (instance, changeObj) => {
        // Avoid emitting events caused by setting the value programmatically
        if (changeObj.origin !== "setValue") {
          const value = instance.getValue();
          if (onChange) {
            onChange(value);
          }
          // Emit the code change to the server
          socket.emit("code", { value });
        }
      });
    }

    // Cleanup CodeMirror editor on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
    };
  }, [defaultValue, onChange]);

  useEffect(() => {
    socket.on("code", ({ value }) => {
      if (editorRef.current && value !== editorRef.current.getValue()) {
        editorRef.current.setValue(value);
      }
    });

    return () => {
      socket.off("code");
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "70vw" }}>
      <textarea ref={textAreaRef}></textarea>
    </div>
  );
};

export default CodeEditor;
