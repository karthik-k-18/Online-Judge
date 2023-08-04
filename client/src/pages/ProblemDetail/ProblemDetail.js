import React, { useState } from "react";
import MonacoEditor from "../../components/Editor/Editor";
import "./ProblemDetail.css";

const ProblemDetail = () => {
  const [problem, setProblem] = useState([]);
  const [code, setCode] = useState("cout<<'hello world';");
  console.log(code);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <div className="split-container">
      <div className="code-container">
        {/* Render your user code component here */}
        {/* For example, <UserEditor /> or any other component */}
      </div>

      <div className="verticalsplitter" draggable="true"></div>

      <div className="editor-container">
        <div className="language-selector">
          Language - 
          <select>
            <option value="cpp">C++</option>
          </select>
        </div>
        <MonacoEditor onChange={handleCodeChange} />
        <div className="horizontalsplitter" draggable="true"></div>
        <div className="footer">
          <div className="line-1">
            <button>Submit</button>
          </div>
          <div className="line-2">
            <textarea
              placeholder="Custom Input"
              rows="1"
              onKeyDown={(e) => {
                // Set the textarea height to fit the content as the user types
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <button>Run</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDetail;
