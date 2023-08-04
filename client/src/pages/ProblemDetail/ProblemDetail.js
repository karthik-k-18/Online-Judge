
import React from 'react';
import MonacoEditor from '../../components/Editor/Editor';
import './ProblemDetail.css';

const ProblemDetail = () => {
  return (
    <div className="split-container">
      <div className="code-container">
        {/* Render your user code component here */}
        {/* For example, <UserEditor /> or any other component */}
      </div>
      <div className="verticalsplitter" draggable="true"></div>
      <div className="editor-container">
        <MonacoEditor />
        <div className="horizontalsplitter" draggable="true"></div>
        <div className="footer">
          <input type="text" placeholder="Custom Input" />
          <button >Run</button>
          <button >Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;