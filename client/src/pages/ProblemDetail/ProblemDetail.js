import React, { useState, useEffect } from "react";
import MonacoEditor from "../../components/EditorPanel/Editor";
import ProblemPanel from "../../components/ProblemPanel/ProblemPanel";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./ProblemDetail.css";
import axios from "axios";
import { Typography } from "@mui/material";

const cppCode =
  '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}';

const ProblemDetail = () => {
  const [problem, setProblem] = useState([]);
  const [code, setCode] = useState(cppCode);
  const [verdictLoading, setVerdictLoading] = useState(false);
  const [once, setOnce] = useState(false);
  const { slug } = useParams();
  const [verdict, setVerdict] = useState("");
  const [verdictError, setVerdictError] = useState("");
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_ENDPOINT + "problems/" + slug
        );
        setProblem(res.data);
      } catch (error) {
      } finally {
      }
    };
    fetchProblem();
  }, [slug]);

  const handleSubmit = async () => {
    try {
      if (!once) setOnce(true);
      setVerdictLoading(true);
      const res = await axios.post(
        process.env.REACT_APP_API_ENDPOINT + "problems/" + slug + "/submit",
        {
          code: code,
        }
      );
      setVerdict(res.data.verdict);
    } catch (error) {
      if (error.response && error.response.data) {
        setVerdict(error.response.data.message);
        console.log(error.response.data.message);
      }
    } finally {
      setVerdictLoading(false);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  return (
    <div className="split-container">
      <div className="code-container">
        <ProblemPanel problem={problem} />
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

        {!once ? (
          <></>
        ) : (
          <Verdict verdictLoading={verdictLoading} verdict={verdict} />
        )}

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

const Verdict = ({ verdictLoading, verdict }) => {
  return (
    <>
      {verdictLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0 0 0",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 0 0 0",
          }}
        >
          <Typography variant="h5" component="h2" sx={{marginTop:'5px'}}>
            {verdict}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ProblemDetail;
