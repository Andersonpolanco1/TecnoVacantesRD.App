"use client";

import React from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

interface RichTextProps {
  value: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

const RichText: React.FC<RichTextProps> = ({
  value,
  onChange,
  readonly = false,
}) => {
  return (
    <div className="rich-text-container">
      <ReactQuill
        theme={readonly ? "bubble" : "snow"}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
    </div>
  );
};

export default RichText;
