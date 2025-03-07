"use client";
import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextProps {
  value: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

const options = {
  debug: "info",
  modules: {
    toolbar: true,
  },
  placeholder: "Compose an epic...",
  theme: "snow",
};

const RichText: React.FC<RichTextProps> = ({
  value,
  onChange,
  readonly = false,
}) => {
  return (
    <ReactQuill
      theme={readonly ? "bubble" : "snow"}
      value={value}
      onChange={onChange}
      readOnly={readonly}
      className="rich-text-editor"
    />
  );
};

export default RichText;
