import React from 'react';

import './ProgressBar.css';

export default function ProgressBar({
  text,
  percent,
}) {

  return (
    <div className="progress">
      <div className="progress-label">
        <span>Remaining</span>
        <span>{text} secs</span>
      </div>
      <div className="progress-bar--wrapper">
        <div className="progress-bar" style={{ width: `${percent}%` }}></div>
        <div className="progress-bar-delimiter"></div>
      </div>
    </div>
  );
}