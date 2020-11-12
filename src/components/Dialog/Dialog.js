import React from "react";

import './Dialog.css';

export const Dialog = ({
  title,
  text,
}) => {
  return (
    <div className="dialog-fade">
      <div className="dialog">
        <div className="dialog__title">
          {title}
        </div>
        <div className="dialog__body">
          {text}
        </div>
      </div>
    </div>
  );
};
