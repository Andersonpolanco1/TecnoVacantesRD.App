"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

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
