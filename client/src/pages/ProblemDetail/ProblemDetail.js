import React, { useState, useEffect } from "react";
import MonacoEditor from "../../components/EditorPanel/Editor";
import ProblemPanel from "../../components/ProblemPanel/ProblemPanel";
import { useParams } from "react-router-dom";
import "./ProblemDetail.css";
import axios from "axios";

const ProblemDetail = () => {
  const [problem, setProblem] = useState([]);
  const [code, setCode] = useState("");
  const { slug } = useParams();
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_ENDPOINT + "problems/" + slug
        );
        setProblem(res.data);
      } catch(error) {
        console.log(error.response.message);
      } finally {
      }
    };
    fetchProblem();
  }, [slug]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_ENDPOINT + "problems/" + slug + "/submit",
        {
          code: code,
        }
      );
      console.log(res.data);
    } catch {
    } finally {
    }
  };


  console.log(problem);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <div className="split-container">
      <div className="code-container">
        <ProblemPanel problem={problem}/>
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
            <button onClick={handleSubmit}>Submit</button>
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
